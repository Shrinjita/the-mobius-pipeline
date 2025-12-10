import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  lastQueryTime?: string;
  provenanceCoverage?: string;
}

export function Header({
  userName = "Dr. Aris Thakur",
  userRole = "Director, R&D Strategy",
  lastQueryTime = "92s",
  provenanceCoverage = "94%",
}: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
    >
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">∞</span>
            <span className="text-xl font-bold text-primary">MÖBIUS</span>
          </div>
          <Badge variant="outline" className="hidden sm:flex">
            Pipeline Intelligence
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Last query:</span>
            <span className="font-medium text-foreground">{lastQueryTime}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Provenance:</span>
            <span className="font-medium text-success">{provenanceCoverage}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
            AT
          </div>
        </div>
      </div>
    </motion.header>
  );
}
