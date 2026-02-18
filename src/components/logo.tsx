
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img 
        src="/logo.png" 
        alt="Logo Déménagement Du Vexin"
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}
