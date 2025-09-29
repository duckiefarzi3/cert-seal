import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b border-border glass-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CertifyChain
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/verify">
              <Button variant="ghost">Verify</Button>
            </Link>
            <Link to="/issuer">
              <Button variant="hero">Issuer Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
