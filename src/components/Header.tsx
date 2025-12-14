import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  lastQueryTime?: string;
  provenanceCoverage?: string;
}

export function Header({
  lastQueryTime = "92s",
  provenanceCoverage = "94%",
}: HeaderProps) {
  const { user, logout } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "AT";
    return user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get user role from auth or use default
  const getUserRole = () => {
    return user?.role || "Director, R&D Strategy";
  };

  // Get user name from auth or use default
  const getUserName = () => {
    return user?.name || "Dr. Aris Thakur";
  };

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

        {/* User Info with Logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{getUserName()}</p>
            <p className="text-xs text-muted-foreground">{getUserRole()}</p>
          </div>
          
          {/* User Avatar */}
          <div className="flex items-center gap-2">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={getUserName()}
                className="h-9 w-9 rounded-full border-2 border-primary/50"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {getUserInitials()}
              </div>
            )}
            
            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}