import { Palette, Code, Megaphone, Video, Globe, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Crafting unique visual identities that tell your story and resonate with your audience.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building fast, responsive, and scalable web applications with modern technologies.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic campaigns that amplify your brand and drive measurable results.",
  },
  {
    icon: Video,
    title: "Motion Design",
    description: "Captivating animations and videos that bring your ideas to life.",
  },
  {
    icon: Globe,
    title: "UI/UX Design",
    description: "User-centered designs that create seamless and delightful experiences.",
  },
  {
    icon: Lightbulb,
    title: "Creative Strategy",
    description: "Innovative solutions that align your creative vision with business goals.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer a comprehensive suite of creative services to help your brand 
            stand out in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card-elevated p-8 hover-lift group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <div className="w-4 h-[2px] bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
