import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Nexus Brand",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Flow App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Pulse Website",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Spark Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
    color: "from-orange-500/20 to-red-500/20",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md">
            A glimpse into our creative portfolio showcasing the diverse range 
            of projects we've delivered.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer hover-lift"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-60`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-primary text-sm font-medium mb-2">
                  {project.category}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300">
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
