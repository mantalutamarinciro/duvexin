
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image 
        src="/images/logo.png" 
        alt="Logo Déménagement Du Vexin"
        width={200}
        height={50}
        className="h-12 md:h-16 w-auto object-contain"
        priority
      />
    </div>
  );
}
