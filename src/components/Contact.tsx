import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-background" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* CTA Card */}
        <div className="glass-card-elevated p-12 lg:p-20 text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Create <span className="gradient-text">Something Amazing?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Let's collaborate and bring your vision to life. Get in touch with us 
            today and let's start your next project.
          </p>
          <Button variant="hero" size="xl">
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Mail,
              title: "Email Us",
              info: "hello@cre8tivesync.com",
              link: "mailto:hello@cre8tivesync.com",
            },
            {
              icon: Phone,
              title: "Call Us",
              info: "+1 (555) 123-4567",
              link: "tel:+15551234567",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              info: "123 Creative St, Design City",
              link: "#",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="glass-card p-8 text-center hover-lift group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {item.info}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
