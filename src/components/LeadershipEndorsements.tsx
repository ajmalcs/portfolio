import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const endorsements = [
  {
    quote: "Appreciate your effort in leading the SVA project and being the pillar for that. You are also doing a great job as Scrum Master. Keep up the great spirit.",
    author: "Mridul Jayaprakash",
    role: "Senior Project Manager",
    badge: "Infosys INSTA Award",
    label: "The Leader"
  },
  {
    quote: "Ajmal is the Power BI expert in the team. He has become a SME for the customer and the go-to person for any Power BI and AAS queries.",
    author: "Monsy Sebastian",
    role: "Delivery Manager",
    badge: "Infosys INSTA Award",
    label: "The Expert"
  },
  {
    quote: "Great work learning Looker and getting excellent feedback from our partner Google. It is not easy for a beginner to do these dashboards. Well done.",
    author: "Ajith Krishnanunni",
    role: "Senior Project Manager",
    badge: "Infosys INSTA Award",
    label: "The Learner"
  },
  {
    quote: "Awarded for consistent performance and outstanding commitment towards work.",
    author: "Sathish H C",
    role: "EVP & Head of Global Services",
    badge: "Winner - Delivery Ninja (DNA Rise Award)",
    label: "The Performer"
  }
];

export function LeadershipEndorsements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % endorsements.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + endorsements.length) % endorsements.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Leadership & Recognition</h2>
          <p className="text-sm text-muted-foreground">Endorsements from leaders I've worked with</p>
        </motion.div>

        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-10 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm"
            aria-label="Previous endorsement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-10 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm"
            aria-label="Next endorsement"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {endorsements.map((endorsement, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="glassmorphism rounded-xl p-5 relative">
                    {/* Quote Icon */}
                    <span className="absolute top-2 left-4 text-4xl text-primary/20 font-serif leading-none select-none">
                      ❝
                    </span>
                    
                    {/* Label Badge */}
                    <div className="flex justify-end mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {endorsement.label}
                      </span>
                    </div>
                    
                    {/* Quote Text */}
                    <blockquote className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 pt-2 italic">
                      "{endorsement.quote}"
                    </blockquote>
                    
                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-border/50">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{endorsement.author}</p>
                        <p className="text-xs text-muted-foreground">{endorsement.role}</p>
                      </div>
                      <span className="inline-flex px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                        {endorsement.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {endorsements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-4 bg-primary' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to endorsement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
