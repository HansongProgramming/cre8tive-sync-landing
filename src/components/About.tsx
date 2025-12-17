import { Award, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We deliver projects on time without compromising quality.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We work closely with you at every stage of the process.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Our work has been recognized by industry leaders.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="glass-card-elevated p-4 rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Our team collaborating"
                className="rounded-2xl w-full h-auto"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 glass-card-elevated p-6 max-w-[200px] animate-float">
              <div className="text-4xl font-bold gradient-text mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              We're a Team of <span className="gradient-text">Creative Minds</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Founded with a passion for innovation, Cre8tive Sync brings together 
              talented designers, developers, and strategists who share a common goal: 
              to create exceptional digital experiences that drive real results.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We believe that great design is not just about aesthetics—it's about 
              solving problems, telling stories, and creating connections that matter.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
