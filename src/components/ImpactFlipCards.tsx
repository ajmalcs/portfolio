import { motion } from "framer-motion";
import { Layers, Users, Zap } from "lucide-react";

const impacts = [
  {
    front: "Data Architecture",
    back: "Designed scalable Azure Synapse models for enterprise reporting.",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    front: "Team Leadership",
    back: "Managed onshore/offshore teams for 3+ years.",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    front: "Performance",
    back: "Optimized ETL pipelines reducing latency for US Logistics clients.",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
  },
];

export const ImpactFlipCards = () => {
  return (
    <div className="mt-8">
      <motion.h4
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider"
      >
        Key Impacts
      </motion.h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.front}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group perspective-1000"
          >
            <div className="relative h-36 transition-all duration-500 transform-style-preserve-3d group-hover:rotate-y-180 cursor-pointer">
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-card to-secondary border border-border p-4 flex flex-col items-center justify-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${impact.gradient} flex items-center justify-center`}>
                  <impact.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-center">{impact.front}</span>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-4 flex items-center justify-center text-primary-foreground">
                <p className="text-sm text-center font-medium leading-relaxed">
                  {impact.back}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
