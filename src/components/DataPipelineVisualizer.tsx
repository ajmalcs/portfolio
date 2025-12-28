import { motion } from "framer-motion";
import { Database, Factory, BarChart3, Layers, Radio, Zap, FileSpreadsheet, Server, Globe, RefreshCw, Settings, GitBranch } from "lucide-react";
import { useState, useEffect } from "react";

// Hot Path (Real-time Streaming)
const hotPathSteps = [
  { id: "eventhubs", icon: Radio, label: "Event Hubs", tooltip: "" },
  { id: "databricks", icon: Zap, label: "Databricks", tooltip: "Structured Streaming & Transformation" },
  { id: "cosmosdb", icon: Globe, label: "Cosmos DB", tooltip: "Low-latency Operational Store" },
];

// Cold Path (Batch Processing)
const coldPathSteps = [
  { id: "adf", icon: Factory, label: "Data Factory", tooltip: "" },
  { id: "synapse", icon: Layers, label: "SQL / Synapse", tooltip: "" },
];

const HotParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/80"
    style={{ filter: "blur(0.5px)" }}
    initial={{ left: "0%", opacity: 0 }}
    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 0.8, delay, repeat: Infinity, ease: "linear" }}
  />
);

const ColdParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/70"
    style={{ filter: "blur(0.5px)" }}
    initial={{ left: "0%", opacity: 0 }}
    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, ease: "linear" }}
  />
);

const MergeParticle = ({ delay, isHot }: { delay: number; isHot: boolean }) => (
  <motion.div
    className={`absolute w-1.5 h-1.5 rounded-full shadow-lg ${isHot ? 'bg-orange-500 shadow-orange-500/80' : 'bg-primary shadow-primary/70'}`}
    style={{ filter: "blur(0.5px)" }}
    initial={{ top: "0%", opacity: 0 }}
    animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
    transition={{ duration: isHot ? 0.6 : 1.5, delay, repeat: Infinity, ease: "linear" }}
  />
);

const HotConnectionLine = ({ index }: { index: number }) => (
  <div className="flex-1 relative h-0.5 mx-1">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-orange-500/60 to-orange-500/40 rounded-full" />
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1, 2, 3, 4].map((i) => <HotParticle key={i} delay={i * 0.16 + index * 0.1} />)}
    </div>
  </div>
);

const ColdConnectionLine = ({ index }: { index: number }) => (
  <div className="flex-1 relative h-0.5 mx-1">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-full" />
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => <ColdParticle key={i} delay={i * 0.7 + index * 0.3} />)}
    </div>
  </div>
);

interface StepNodeProps {
  step: { id: string; icon: React.ElementType; label: string; tooltip: string };
  index: number;
  isHot: boolean;
  isVisible: boolean;
}

const StepNode = ({ step, index, isHot, isVisible }: StepNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      {step.tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap pointer-events-none"
        >
          <div className="bg-foreground text-background px-2 py-1 rounded text-[10px] font-medium shadow-lg">
            {step.tooltip}
          </div>
        </motion.div>
      )}
      
      <motion.div
        whileHover={{ scale: 1.08 }}
        className={`relative w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isHovered
            ? isHot 
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/40"
              : "bg-primary text-primary-foreground shadow-md shadow-primary/40"
            : "bg-card border border-border"
        }`}
      >
        <step.icon className={`w-4 h-4 md:w-5 md:h-5 ${isHovered ? 'text-white' : isHot ? 'text-orange-500' : 'text-primary'}`} />
      </motion.div>
      <span className={`mt-1 text-[9px] md:text-[10px] font-medium text-center max-w-[50px] md:max-w-[60px] leading-tight ${isHovered ? isHot ? 'text-orange-500' : 'text-primary' : 'text-muted-foreground'}`}>
        {step.label}
      </span>
    </motion.div>
  );
};

export const DataPipelineVisualizer = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-1">Enterprise Lambda Architecture</h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Unified real-time and batch processing under a metadata-driven framework
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glassmorphism rounded-xl p-4 md:p-6 max-w-4xl mx-auto"
        >

          <div className="flex items-stretch gap-2 md:gap-4">
            
            {/* Data Sources (Left) */}
            <div className="flex flex-col justify-center gap-6 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
                  <Server className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                </div>
                <span className="mt-1 text-[8px] md:text-[9px] font-medium text-muted-foreground text-center">IoT / APIs</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
                    <FileSpreadsheet className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                </div>
                <span className="mt-1 text-[8px] md:text-[9px] font-medium text-muted-foreground text-center">SQL / Files</span>
              </motion.div>
            </div>

            {/* Main Paths Container */}
            <div className="flex-1 flex flex-col gap-3 relative">
              
              {/* Hot Path */}
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredSection("hot")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={hoveredSection === "hot" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-foreground text-background px-2 py-1 rounded text-[9px] font-medium shadow-lg">
                    Low-latency streaming for operational alerts
                  </div>
                </motion.div>
                
                <div className={`rounded-lg p-2 md:p-3 border transition-all duration-300 ${
                  hoveredSection === "hot" 
                    ? "bg-orange-500/10 border-orange-500/50" 
                    : "bg-card/30 border-border/40"
                }`}>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-semibold text-orange-500">Real-Time</span>
                  </div>
                  <div className="flex items-center">
                    {hotPathSteps.map((step, index) => (
                      <div key={step.id} className="contents">
                        <StepNode step={step} index={index} isHot={true} isVisible={isVisible} />
                        {index < hotPathSteps.length - 1 && <HotConnectionLine index={index} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cold Path */}
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredSection("cold")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={hoveredSection === "cold" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-foreground text-background px-2 py-1 rounded text-[9px] font-medium shadow-lg">
                    High-volume historical analysis and reporting
                  </div>
                </motion.div>
                
                <div className={`rounded-lg p-2 md:p-3 border transition-all duration-300 ${
                  hoveredSection === "cold" 
                    ? "bg-primary/10 border-primary/50" 
                    : "bg-card/30 border-border/40"
                }`}>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[9px] md:text-[10px] font-semibold text-primary">Batch</span>
                  </div>
                  <div className="flex items-center">
                    {coldPathSteps.map((step, index) => (
                      <div key={step.id} className="contents">
                        <StepNode step={step} index={index} isHot={false} isVisible={isVisible} />
                        {index < coldPathSteps.length - 1 && <ColdConnectionLine index={index} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metadata Framework - Bottom spanning block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="relative mt-1"
                onMouseEnter={() => setHoveredSection("metadata")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={hoveredSection === "metadata" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-foreground text-background px-2 py-1 rounded text-[9px] font-medium shadow-lg">
                    Dynamic Pipeline Generation & Audit Logging
                  </div>
                </motion.div>

                <div className={`rounded-lg p-2 border-2 border-dashed transition-all duration-300 ${
                  hoveredSection === "metadata"
                    ? "bg-violet-500/10 border-violet-500/60"
                    : "bg-violet-500/5 border-violet-500/30"
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Settings className="w-3 h-3 md:w-4 md:h-4 text-violet-500" />
                    <span className="text-[9px] md:text-[10px] font-semibold text-violet-500">Metadata & Governance Framework</span>
                    <GitBranch className="w-3 h-3 md:w-4 md:h-4 text-violet-500" />
                  </div>
                </div>

                {/* Dotted lines going up to ADF and Databricks */}
                <div className="absolute -top-[52px] left-1/4 w-px h-6 border-l border-dashed border-violet-500/40" />
                <div className="absolute -top-[105px] left-1/3 w-px h-6 border-l border-dashed border-violet-500/40" />
              </motion.div>
            </div>

            {/* Convergence: AAS + Power BI (Right) */}
            <div className="flex flex-col items-center justify-center gap-2 shrink-0 relative">
              {/* Merge arrows from paths */}
              <div className="absolute -left-2 top-1/4 w-2 h-px">
                <div className="w-full h-full bg-gradient-to-r from-orange-500/60 to-transparent" />
                <div className="absolute inset-0 overflow-hidden">
                  <MergeParticle delay={0} isHot={true} />
                </div>
              </div>
              <div className="absolute -left-2 top-1/2 w-2 h-px">
                <div className="w-full h-full bg-gradient-to-r from-primary/60 to-transparent" />
                <div className="absolute inset-0 overflow-hidden">
                  <MergeParticle delay={0.3} isHot={false} />
                </div>
              </div>

              {/* Logic Apps - Connected to AAS */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center relative"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <RefreshCw className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                </div>
                <span className="mt-0.5 text-[7px] md:text-[8px] font-medium text-emerald-500 text-center">Logic Apps</span>
                {/* Dotted connection line to AAS */}
                <div className="w-px h-2 md:h-3 border-l-2 border-dashed border-emerald-500/60" />
                <span className="text-[6px] md:text-[7px] text-emerald-500/70 absolute -right-10 md:-right-12 top-3 whitespace-nowrap">Auto Refresh</span>
              </motion.div>

              {/* AAS - Semantic Layer */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-blue-400/50">
                  <Layers className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="mt-1 text-[8px] md:text-[9px] font-semibold text-blue-500 text-center leading-tight">Azure<br/>Analysis<br/>Services</span>
              </motion.div>

              {/* Connection line to Power BI */}
              <div className="relative w-0.5 h-3 md:h-4">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/60 to-yellow-500/60 rounded-full" />
              </div>

              {/* Power BI - Final Output */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.45 }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>
                <span className="mt-1 text-[8px] md:text-[9px] font-semibold text-yellow-500 text-center">Power BI</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-3 border-t border-border/40 grid grid-cols-3 gap-3 text-center"
          >
            <div>
              <div className="text-lg md:text-xl font-bold text-primary">100+</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground">Pipelines Built</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold text-primary">TB+</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground">Data Processed</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold text-primary">99.9%</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground">Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
