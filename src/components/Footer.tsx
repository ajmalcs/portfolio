import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            © 2025 ajmal.cs. All rights reserved.
          </div>

          <div className="flex items-center gap-6 pr-28">
            <a
              href="https://linkedin.com/in/ajmalcs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:ajmal.cs813@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">ajmal.cs813@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}