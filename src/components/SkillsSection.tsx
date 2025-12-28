import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, BarChart3, Database, Code, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  primary: string[];
  secondary: string[];
  highlighted?: string[];
  badged?: string[];
  tooltips?: Record<string, string>;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Cloud & Infrastructure",
    icon: <Cloud className="h-5 w-5" />,
    primary: ["Azure Data Factory", "Synapse Analytics", "Azure Databricks", "Azure Key Vault", "Microsoft Entra ID (RBAC)"],
    secondary: ["Azure Functions", "Logic Apps", "Event Hubs", "Azure Virtual Networks (VNet)", "Azure Policy", "Cost Management"],
    highlighted: [],
    badged: [],
    tooltips: {
      "Microsoft Entra ID (RBAC)": "Security & Network Isolation Architecture",
      "Azure Virtual Networks (VNet)": "Security & Network Isolation Architecture",
    },
  },
  {
    title: "Database & Storage",
    icon: <Database className="h-5 w-5" />,
    primary: ["ADLS Gen2", "Delta Lake", "SQL Server", "Cosmos DB", "MongoDB"],
    secondary: ["Elastic Search", "BigQuery"],
    highlighted: ["ADLS Gen2"],
  },
  {
    title: "BI & Visualization",
    icon: <BarChart3 className="h-5 w-5" />,
    primary: ["Power BI", "Azure Analysis Services", "Looker", "LookML"],
    secondary: ["Jasper Reports", "Kibana"],
    highlighted: [],
  },
  {
    title: "Dev & Operations",
    icon: <Code className="h-5 w-5" />,
    primary: ["Python", "Apache Spark", "Azure DevOps (CI/CD)", "PowerShell"],
    secondary: ["Docker", "Kubernetes (AKS)", "Git", "Logstash"],
    highlighted: ["Azure DevOps (CI/CD)"],
  },
];

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <div className="relative h-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
            <span className="text-primary group-hover:text-primary-foreground transition-colors">
              {category.icon}
            </span>
          </div>
          <h3 className="font-semibold text-base">{category.title}</h3>
        </div>

        {/* Primary Skills */}
        <ul className="space-y-2.5 mb-4">
          {category.primary.map((skill) => {
            const hasTooltip = category.tooltips?.[skill];
            const skillContent = (
              <li
                key={skill}
                className={`text-sm flex items-center gap-2 ${
                  category.highlighted?.includes(skill)
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                } ${hasTooltip ? "cursor-help border-b border-dashed border-primary/40" : ""}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  category.highlighted?.includes(skill) ? "bg-primary" : "bg-primary/50"
                }`} />
                {skill}
              </li>
            );

            if (hasTooltip) {
              return (
                <Tooltip key={skill}>
                  <TooltipTrigger asChild>
                    {skillContent}
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-primary-foreground">
                    <p className="text-xs font-medium">{category.tooltips![skill]}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }
            return skillContent;
          })}
        </ul>

        {/* Expandable Secondary Skills */}
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-2.5 mb-4 overflow-hidden"
            >
              {category.secondary.map((skill) => {
                const hasTooltip = category.tooltips?.[skill];
                const skillContent = (
                  <li
                    key={skill}
                    className={`text-sm flex items-center gap-2 ${
                      category.badged?.includes(skill)
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    } ${hasTooltip ? "cursor-help border-b border-dashed border-primary/40" : ""}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      category.badged?.includes(skill) ? "bg-primary" : "bg-muted-foreground/50"
                    }`} />
                    {skill}
                    {category.badged?.includes(skill) && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded">
                        Architect
                      </span>
                    )}
                  </li>
                );

                if (hasTooltip) {
                  return (
                    <Tooltip key={skill}>
                      <TooltipTrigger asChild>
                        {skillContent}
                      </TooltipTrigger>
                      <TooltipContent className="bg-primary text-primary-foreground">
                        <p className="text-xs font-medium">{category.tooltips![skill]}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }
                return skillContent;
              })}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Expand Toggle */}
        {category.secondary.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-2"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
            {isExpanded ? "Show Less" : `+ ${category.secondary.length} More Skills`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <TooltipProvider>
      <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Architect-level expertise across cloud platforms, data infrastructure, and development technologies
            </p>
          </motion.div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
