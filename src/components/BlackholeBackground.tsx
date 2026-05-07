import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const FRAGMENT_SHADER_DEFINES = `
#define STEP 0.05
#define NSTEPS 600
`;

const FRAGMENT_SHADER = `
#define PI 3.141592653589793238462643383279
#define DEG_TO_RAD (PI/180.0)
#define ROT_Y(a) mat3(1, 0, 0, 0, cos(a), sin(a), 0, -sin(a), cos(a))
#define ROT_Z(a) mat3(cos(a), -sin(a), 0, sin(a), cos(a), 0, 0, 0, 1)

uniform float time;
uniform vec2 resolution;
uniform vec3 cam_pos;
uniform vec3 cam_dir;
uniform vec3 cam_up;
uniform float fov;
uniform vec3 cam_vel;

const float MIN_TEMPERATURE = 1000.0;
const float TEMPERATURE_RANGE = 39000.0;

uniform bool accretion_disk;
uniform bool use_disk_texture;
const float DISK_IN = 2.0;
const float DISK_WIDTH = 4.0;

uniform bool doppler_shift;
uniform bool lorentz_transform;
uniform bool beaming;

uniform sampler2D bg_texture;
uniform sampler2D star_texture;
uniform sampler2D disk_texture;

vec2 square_frame(vec2 screen_size){
  vec2 position = 2.0 * (gl_FragCoord.xy / screen_size.xy) - 1.0;
  return position;
}

vec2 to_spherical(vec3 cartesian_coord){
  vec2 uv = vec2(atan(cartesian_coord.z,cartesian_coord.x), asin(cartesian_coord.y));
  uv *= vec2(1.0/(2.0*PI), 1.0/PI);
  uv += 0.5;
  return uv;
}

vec3 lorentz_transform_velocity(vec3 u, vec3 v){
  float speed = length(v);
  if (speed > 0.0){
    float gamma = 1.0/sqrt(1.0-dot(v,v));
    float denominator = 1.0 - dot(v,u);
    vec3 new_u = (u/gamma - v + (gamma/(gamma+1.0)) * dot(u,v)*v)/denominator;
    return new_u;
  }
  return u;
}

vec3 temp_to_color(float temp_kelvin){
  vec3 color;
  temp_kelvin = clamp(temp_kelvin, 1000.0, 40000.0) / 100.0;
  if (temp_kelvin <= 66.0){
    color.r = 255.0;
    color.g = temp_kelvin;
    color.g = 99.4708025861 * log(color.g) - 161.1195681661;
    if (color.g < 0.0) color.g = 0.0;
    if (color.g > 255.0) color.g = 255.0;
  } else {
    color.r = temp_kelvin - 60.0;
    if (color.r < 0.0) color.r = 0.0;
    color.r = 329.698727446 * pow(color.r, -0.1332047592);
    if (color.r < 0.0) color.r = 0.0;
    if (color.g > 255.0) color.r = 255.0;
    color.g = temp_kelvin - 60.0;
    if (color.g < 0.0) color.g = 0.0;
    color.g = 288.1221695283 * pow(color.g, -0.0755148492);
    if (color.g > 255.0) color.g = 255.0;
  }
  if (temp_kelvin >= 66.0){
    color.b = 255.0;
  } else if (temp_kelvin <= 19.0){
    color.b = 0.0;
  } else {
    color.b = temp_kelvin - 10.0;
    color.b = 138.5177312231 * log(color.b) - 305.0447927307;
    if (color.b < 0.0) color.b = 0.0;
    if (color.b > 255.0) color.b = 255.0;
  }
  color /= 255.0;
  return color;
}

void main() {
  float uvfov = tan(fov / 2.0 * DEG_TO_RAD);
  vec2 uv = square_frame(resolution);
  uv *= vec2(resolution.x/resolution.y, 1.0);
  vec3 forward = normalize(cam_dir);
  vec3 up = normalize(cam_up);
  vec3 nright = normalize(cross(forward, up));
  up = cross(nright, forward);
  vec3 pixel_pos = cam_pos + forward + nright*uv.x*uvfov + up*uv.y*uvfov;
  vec3 ray_dir = normalize(pixel_pos - cam_pos);

  if (lorentz_transform)
    ray_dir = lorentz_transform_velocity(ray_dir, cam_vel);

  vec4 color = vec4(0.0,0.0,0.0,1.0);

  vec3 point = cam_pos;
  vec3 velocity = ray_dir;
  vec3 c = cross(point,velocity);
  float h2 = dot(c,c);

  float ray_gamma = 1.0/sqrt(1.0-dot(cam_vel,cam_vel));
  float ray_doppler_factor = ray_gamma * (1.0 + dot(ray_dir, -cam_vel));

  float ray_intensity = 1.0;
  if (beaming)
    ray_intensity /= pow(ray_doppler_factor, 3.0);

  vec3 oldpoint;
  float distance = length(point);

  for (int i=0; i<NSTEPS; i++){
    oldpoint = point;
    point += velocity * STEP;
    vec3 accel = -1.5 * h2 * point / pow(dot(point,point),2.5);
    velocity += accel * STEP;

    distance = length(point);
    if (distance < 0.0) break;

    bool horizon_mask = distance < 1.0 && length(oldpoint) > 1.0;
    if (horizon_mask){
      color += vec4(0.0,0.0,0.0,1.0);
      break;
    }

    if (accretion_disk){
      if (oldpoint.y * point.y < 0.0){
        float lambda = -oldpoint.y/velocity.y;
        vec3 intersection = oldpoint + lambda*velocity;
        float r = length(intersection);
        if (DISK_IN <= r && r <= DISK_IN+DISK_WIDTH){
          float phi = atan(intersection.x, intersection.z);
          vec3 disk_velocity = vec3(-intersection.x, 0.0, intersection.z)/sqrt(2.0*(r-1.0))/(r*r);
          phi -= time;
          phi = mod(phi, PI*2.0);
          float disk_gamma = 1.0/sqrt(1.0-dot(disk_velocity,disk_velocity));
          float disk_doppler_factor = disk_gamma*(1.0+dot(ray_dir/distance, disk_velocity));

          if (use_disk_texture){
            vec2 tex_coord = vec2(mod(phi,2.0*PI)/(2.0*PI), 1.0-(r-DISK_IN)/(DISK_WIDTH));
            vec4 disk_color = texture2D(disk_texture, tex_coord) / (ray_doppler_factor * disk_doppler_factor);
            float disk_alpha = clamp(dot(disk_color,disk_color)/4.5,0.0,1.0);
            if (beaming) disk_alpha /= pow(disk_doppler_factor,3.0);
            color += vec4(disk_color)*disk_alpha;
          } else {
            float disk_temperature = 10000.0*(pow(r/DISK_IN, -3.0/4.0));
            if (doppler_shift) disk_temperature /= ray_doppler_factor*disk_doppler_factor;
            vec3 disk_color = temp_to_color(disk_temperature);
            float disk_alpha = clamp(dot(disk_color,disk_color)/3.0,0.0,1.0);
            if (beaming) disk_alpha /= pow(disk_doppler_factor,3.0);
            color += vec4(disk_color, 1.0)*disk_alpha;
          }
        }
      }
    }
  }

  if (distance > 1.0){
    ray_dir = normalize(point - oldpoint);
    vec2 tex_coord = to_spherical(ray_dir * ROT_Z(45.0 * DEG_TO_RAD));
    vec4 star_color = texture2D(star_texture, tex_coord);
    if (star_color.g > 0.0){
      float star_temperature = (MIN_TEMPERATURE + TEMPERATURE_RANGE*star_color.r);
      float star_velocity = star_color.b - 0.5;
      float star_doppler_factor = sqrt((1.0+star_velocity)/(1.0-star_velocity));
      if (doppler_shift) star_temperature /= ray_doppler_factor*star_doppler_factor;
      color += vec4(temp_to_color(star_temperature),1.0) * star_color.g;
    }
    color += texture2D(bg_texture, tex_coord) * 0.25;
  }

  gl_FragColor = color * ray_intensity;
}
`;

const VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export default function BlackholeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    mount.appendChild(renderer.domElement);

    // --- Scene + fixed camera for full-screen quad ---
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // --- Post-processing ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(128, 128), 0.1, 2.0, 0.0);
    const shaderPass = new ShaderPass(CopyShader);
    shaderPass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(shaderPass);

    // --- Uniforms ---
    const uniforms: Record<string, THREE.IUniform> = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2() },
      accretion_disk: { value: true },
      use_disk_texture: { value: true },
      lorentz_transform: { value: false },
      doppler_shift: { value: false },
      beaming: { value: false },
      cam_pos: { value: new THREE.Vector3() },
      cam_vel: { value: new THREE.Vector3() },
      cam_dir: { value: new THREE.Vector3() },
      cam_up: { value: new THREE.Vector3() },
      fov: { value: 60.0 },
      bg_texture: { value: null },
      star_texture: { value: null },
      disk_texture: { value: null },
    };

    // --- Shader plane ---
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER_DEFINES + FRAGMENT_SHADER,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // --- Textures ---
    const textureLoader = new THREE.TextureLoader();
    const loadTex = (url: string, filter: THREE.TextureFilter) => {
      const tex = textureLoader.load(url);
      tex.magFilter = filter;
      tex.minFilter = filter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };
    uniforms.bg_texture.value = loadTex('/milkyway.jpg', THREE.NearestFilter);
    uniforms.star_texture.value = loadTex('/star_noise.png', THREE.LinearFilter);
    uniforms.disk_texture.value = loadTex('/accretion_disk.png', THREE.LinearFilter);

    // --- Observer state ---
    const INCLINE = -5 * Math.PI / 180;
    const CAM_DISTANCE = 12;
    let theta = 0;
    let angularVelocity = 0;
    const maxAngularVelocity = 1 / Math.sqrt(2.0 * (CAM_DISTANCE - 1.0)) / CAM_DISTANCE;
    let orbiting = true; // auto-orbit on by default

    const camPos = new THREE.Vector3(0, 0, CAM_DISTANCE);
    const camVel = new THREE.Vector3();
    const camUp = new THREE.Vector3(0, 1, 0);
    const camDir = new THREE.Vector3(0, 0, -1);

    // Apply incline to up vector once
    camUp.applyMatrix4(new THREE.Matrix4().makeRotationZ(INCLINE));

    // --- Look / drag state ---
    let pitch = 0;
    let yaw = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let offsetX = 0;
    let offsetY = 0;
    const LOOK_SPEED = 0.004;

    // Touch state (single finger = look, two fingers = pinch-zoom)
    let lastTouchX = 0;
    let lastTouchY = 0;
    let lastPinchDist = 0;
    let fov = 60.0;
    const FOV_MIN = 20;
    const FOV_MAX = 90;

    const setDirection = (p: number, y: number) => {
      const dir = new THREE.Vector3(0, 0, -1)
        .applyEuler(new THREE.Euler(p, y, 0, 'YXZ'))
        .normalize();
      camDir.copy(dir);
    };
    setDirection(pitch, yaw);

    // --- Mouse handlers ---
    const onMouseDown = (e: MouseEvent) => {
      // Only handle left button clicks that aren't on UI elements
      if (e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      offsetX = 0;
      offsetY = 0;
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragging = false;
      offsetX = 0;
      offsetY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      offsetX = e.clientX - lastX;
      offsetY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Double-click toggles orbit
    const onDblClick = () => {
      orbiting = !orbiting;
    };

    // Scroll wheel zooms (adjusts fov)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      fov = Math.min(FOV_MAX, Math.max(FOV_MIN, fov + e.deltaY * 0.05));
    };

    const onContextMenu = (e: Event) => e.preventDefault();

    // --- Touch handlers ---
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragging = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        offsetX = 0;
        offsetY = 0;
      } else if (e.touches.length === 2) {
        dragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchEnd = () => {
      dragging = false;
      offsetX = 0;
      offsetY = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && dragging) {
        offsetX = e.touches[0].clientX - lastTouchX;
        offsetY = e.touches[0].clientY - lastTouchY;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        fov = Math.min(FOV_MAX, Math.max(FOV_MIN, fov - (dist - lastPinchDist) * 0.1));
        lastPinchDist = dist;
      }
    };

    // Attach events to window so dragging works even when cursor moves over site content
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('dblclick', onDblClick);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('contextmenu', onContextMenu);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchend', onTouchEnd);
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });

    // --- Update functions ---
    const inclineMatX = new THREE.Matrix4().makeRotationX(INCLINE);

    const updateObserver = (delta: number) => {
      if (orbiting) {
        if (angularVelocity < maxAngularVelocity * 0.35)
          angularVelocity += delta / CAM_DISTANCE;
        else
          angularVelocity = maxAngularVelocity * 0.35;
      } else {
        if (angularVelocity > 0)
          angularVelocity -= delta / CAM_DISTANCE;
        else {
          angularVelocity = 0;
          camVel.set(0, 0, 0);
        }
      }

      theta += angularVelocity * delta;
      // Keep yaw in sync with orbital rotation so the view tracks the blackhole
      if (orbiting || angularVelocity > 0)
        yaw += angularVelocity * delta;

      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      camPos.set(CAM_DISTANCE * sin, 0, CAM_DISTANCE * cos);
      camVel.set(cos * angularVelocity, 0, -sin * angularVelocity);

      camPos.applyMatrix4(inclineMatX);
      camVel.applyMatrix4(inclineMatX);
    };

    const updateDragControls = () => {
      if (dragging && (offsetX !== 0 || offsetY !== 0)) {
        yaw += LOOK_SPEED * offsetX;
        pitch += LOOK_SPEED * offsetY;
        pitch = Math.min(Math.PI / 2 - 0.01, Math.max(-Math.PI / 2 + 0.01, pitch));
        // Dampen so motion feels smooth, not jerky
        offsetX *= 0.5;
        offsetY *= 0.5;
      }
      setDirection(pitch, yaw);
    };

    // --- Resize ---
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation loop ---
    let animId: number;
    let lastFrame = Date.now();
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = Date.now();
      const delta = Math.min((now - lastFrame) / 1000, 0.1); // cap delta to avoid big jumps
      lastFrame = now;
      time += delta;

      updateObserver(delta);
      updateDragControls();

      uniforms.time.value = time;
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      uniforms.cam_pos.value.copy(camPos);
      uniforms.cam_dir.value.copy(camDir);
      uniforms.cam_up.value.copy(camUp);
      uniforms.cam_vel.value.copy(camVel);
      uniforms.fov.value = fov;

      composer.render();
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('dblclick', onDblClick);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('contextmenu', onContextMenu);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        // Allow pointer events so mouse/touch controls work through the background
        pointerEvents: 'none',
      }}
    />
  );
}
