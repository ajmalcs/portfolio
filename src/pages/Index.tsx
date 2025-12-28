import { PageTransition } from "@/components/PageTransition";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { TypewriterText } from "@/components/TypewriterText";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DataPipelineVisualizer } from "@/components/DataPipelineVisualizer";

import { LiveCodeTerminal } from "@/components/LiveCodeTerminal";
import SkillsSection from "@/components/SkillsSection";
import { LogisticsNetworkMap } from "@/components/LogisticsNetworkMap";
import { ImpactFlipCards } from "@/components/ImpactFlipCards";
import { LeadershipEndorsements } from "@/components/LeadershipEndorsements";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Cloud,
  Database,
  BarChart3,
  Code,
  Award,
  Building2,
  Calendar,
  ChevronRight,
  MapPin,
  Briefcase,
  Workflow,
  Sparkles,
  Zap,
  LineChart,
  Search,
  Server,
  Globe,
  FileCode,
  Terminal,
  Coffee,
  Leaf,
  Bot,
  BadgeCheck,
  Blocks,
  type LucideIcon
} from "lucide-react";

const typewriterTexts = [
  "Cloud Data Professional",
  "Technology Lead - Data & Analytics",
  "BI Solutions Architect",
];

const stats = [
  { end: 7, suffix: "+", label: "Years Experience" },
  { end: 5, suffix: "+", label: "Years US Logistics Domain" },
  { end: 20, suffix: "+", label: "Enterprise Projects" },
  { end: 4, suffix: "", label: "Major Certifications" },
];

// Skills data moved to SkillsSection component

// Tier 1: Expert Certifications
const expertCertifications = [
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    subtitle: "Expert Level Certification",
    issuer: "Microsoft",
    borderColor: "azure"
  },
  {
    name: "Databricks Certified Generative AI Engineer Associate",
    subtitle: "Specialized AI Engineering",
    issuer: "Databricks",
    borderColor: "databricks"
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    subtitle: "Cloud Administration",
    issuer: "Microsoft",
    borderColor: "azure"
  },
];

// Tier 2: Professional Certifications
const professionalCertifications = [
  { name: "Infosys Certified Power BI Advanced Developer", issuer: "Infosys", category: "Data & BI" },
  { name: "Microsoft Certified: Azure Data Fundamentals", issuer: "Microsoft", category: "Data & BI" },
  { name: "Databricks Academy Accreditation - Generative AI Fundamentals", issuer: "Databricks", category: "AI & Emerging Tech" },
  { name: "IBM Blockchain Essentials", issuer: "IBM", category: "AI & Emerging Tech" },
];

const experiences = [
  {
    company: "Infosys",
    role: "Technology Lead - Data & Analytics",
    location: "Ottawa, Canada",
    period: "2021 – Present",
    highlights: [
      "Leading small teams and collaborating with offshore units",
      "Delivering end-to-end BI solutions with Azure and Power BI",
      "Architecting data pipelines and analytics platforms",
      "Driving complex logistics domain transformation projects",
    ],
    current: true,
  },
  {
    company: "Infosys",
    role: "Technology Analyst",
    location: "India",
    period: "2019 – 2021",
    highlights: [
      "Developed BI dashboards and reporting solutions",
      "Implemented ETL pipelines using Azure Data Factory",
      "Collaborated on enterprise data warehouse projects",
    ],
    current: false,
  },
  {
    company: "Stabilix Solutions",
    role: "Software Engineer",
    location: "India",
    period: "2017 – 2019",
    highlights: [
      "Java/Spring Boot web application development",
      "Search optimization and performance tuning",
      "Full-stack development and API design",
    ],
    current: false,
  },
];

export default function Index() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
        <ParticleNetwork />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight text-glow"
            >
              ajmal.cs
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-8 h-12"
            >
              <TypewriterText texts={typewriterTexts} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Transforming data into actionable intelligence through Azure, BI Solutions, and Data Engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg glow-primary hover:scale-105"
              >
                <Briefcase className="h-5 w-5" />
                View Experience
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Stats Bar */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                duration={2000 + index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cloud Data Professional with extensive experience in Business Intelligence,
              Data Analytics, and Engineering. Specialized in the US Logistics domain with
              a proven track record of delivering end-to-end BI solutions. Currently serving
              as a <span className="text-primary font-semibold">Technology Lead</span> at Infosys in Ottawa, Canada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Code Terminal */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
        <div className="container mx-auto px-6">
          <LiveCodeTerminal />
        </div>
      </section>

      {/* Technical Skills Section */}
      <SkillsSection />

      {/* Data Pipeline Visualizer */}
      <DataPipelineVisualizer />

      {/* Experience Timeline with Logistics Network Map */}
      <section id="experience" className="py-20 bg-secondary/30 relative overflow-hidden">
        {/* Logistics Network Map Background */}
        <LogisticsNetworkMap />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground">My professional journey</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                {/* Timeline dot */}
                <div className={`absolute left-0 md:left-4 top-2 w-3 h-3 -translate-x-[5px] rounded-full ${exp.current ? 'bg-primary glow-primary' : 'bg-primary/50'}`}>
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                <div className="glassmorphism glassmorphism-hover rounded-2xl p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mt-1">
                        <Building2 className="h-4 w-4" />
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 justify-end">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 mt-1 justify-end">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Impact Flip Cards - Only for current Infosys role */}
                  {exp.current && exp.company === "Infosys" && (
                    <ImpactFlipCards />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
            <p className="text-muted-foreground">Professional credentials and achievements</p>
          </motion.div>

          {/* Tier 1: Expert Certifications */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {expertCertifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`relative group cursor-pointer`}
              >
                {/* Glowing border effect */}
                <div className={`absolute -inset-0.5 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${cert.borderColor === 'azure'
                    ? 'bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(220,80%,25%)]'
                    : 'bg-gradient-to-br from-[hsl(15,100%,55%)] to-[hsl(15,90%,45%)]'
                  }`} />

                <div className="relative bg-card/90 backdrop-blur-xl rounded-xl p-5 h-full border border-border/50 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 shadow-md ${cert.borderColor === 'azure'
                      ? 'bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(220,80%,35%)]'
                      : 'bg-gradient-to-br from-[hsl(15,100%,55%)] to-[hsl(15,90%,45%)]'
                    }`}>
                    {cert.borderColor === 'azure' ? (
                      <Cloud className="h-6 w-6 text-white" />
                    ) : (
                      <Zap className="h-6 w-6 text-white" />
                    )}
                  </div>

                  <h3 className="font-bold text-sm leading-tight mb-1">{cert.name}</h3>
                  <p className={`text-xs font-medium mb-2 ${cert.borderColor === 'azure' ? 'text-[hsl(210,100%,50%)]' : 'text-[hsl(15,100%,55%)]'
                    }`}>
                    {cert.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tier 2: Professional Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {professionalCertifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-2">
                  <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Endorsements */}
      <LeadershipEndorsements />

      {/* Contact CTA */}
      <section id="contact" className="py-24 gradient-hero relative overflow-hidden">
        <ParticleNetwork />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-glow">
              Let's Work Together
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Looking to collaborate on data solutions or discuss cloud architecture? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:ajmal.cs813@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
              >
                <Mail className="h-5 w-5" />
                ajmal.cs813@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/ajmalcs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  );
}
