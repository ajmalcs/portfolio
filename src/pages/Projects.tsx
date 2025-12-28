import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Globe, Cloud, BarChart3, Search, Code, Layers } from "lucide-react";

interface Project {
  id: number;
  title: string;
  role: string;
  timeline: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Global Logistics Intelligence Hub",
    role: "Tech Lead & Architect",
    timeline: "2022 - Present",
    description: "Architected end-to-end BI ecosystems for a Fortune 500 logistics leader. Orchestrated supply chain visibility tools, managing offshore teams and aligning technical deliverables with US stakeholders.",
    tags: ["Azure", "PowerBI", "TeamLeadership"],
    icon: <Globe className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Enterprise Azure Data Lakehouse",
    role: "Cloud Platform Lead",
    timeline: "2022 - Present",
    description: "Designed a modern data mesh using ADF and Synapse. Integrated Logic Apps for automation and Cosmos DB for high-speed transactions, creating a unified source of truth.",
    tags: ["Synapse", "DataFactory", "CosmosDB"],
    icon: <Cloud className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Governance & Semantic Modeling",
    role: "BI Architect",
    timeline: "2021 - Present",
    description: "Implemented Azure Analysis Services as a semantic layer for governance. Built high-performance dashboards handling multi-million row datasets with sub-second latency.",
    tags: ["AAS", "DAX", "PowerBI"],
    icon: <Layers className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Modern Data Stack (Looker)",
    role: "Data Engineer",
    timeline: "2021 - 2022",
    description: "Pioneered the adoption of Looker/LookML to democratize data. Developed reusable data models that enabled self-service analytics and reduced ad-hoc reporting requests.",
    tags: ["Looker", "LookML", "GoogleCloud"],
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: 5,
    title: "Real-Time Observability Engine",
    role: "Data Engineer",
    timeline: "2019 - 2021",
    description: "Engineered a scalable search solution using the ELK Stack. Enabled real-time log analysis and operational insights for mission-critical applications.",
    tags: ["ElasticSearch", "Kibana", "Logstash"],
    icon: <Search className="h-6 w-6" />,
  },
  {
    id: 6,
    title: "Backend Microservices Development",
    role: "Software Engineer",
    timeline: "2017 - 2019",
    description: "Developed robust RESTful APIs using Java Spring Boot. Focused on search optimization and automated reporting (Jasper) for scalable web applications.",
    tags: ["Java", "SpringBoot", "Microservices"],
    icon: <Code className="h-6 w-6" />,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/60 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
        <span className="text-primary group-hover:text-primary-foreground transition-colors">
          {project.icon}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h2>

      {/* Role & Timeline */}
      <p className="text-xs text-muted-foreground mb-4">
        {project.role} <span className="mx-1.5">|</span> {project.timeline}
      </p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <PageTransition>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Architect-level portfolio spanning enterprise data platforms, 
              cloud infrastructure, and business intelligence ecosystems.
            </p>
          </motion.div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
