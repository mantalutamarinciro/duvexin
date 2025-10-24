import { cn } from "@/lib/utils";
import React from 'react';

// This component uses a regular expression to find `<u>` tags and replace them.
// While not the standard "React way", it's a simple and effective solution
// for this specific text-styling purpose, avoiding complex tree traversal.
export function SectionTitle({ children, className, as: Component = "h2" }: { children: React.ReactNode, className?: string, as?: 'h1' | 'h2' | 'h3' | 'span' }) {
  
  if (typeof children !== 'string') {
    return <Component className={cn("text-3xl md:text-4xl font-headline font-bold", className)}>{children}</Component>
  }
  
  const parts = children.split(/<u>(.*?)<\/u>/g);

  const baseClasses = (Component === 'h1') 
    ? "text-4xl md:text-6xl font-headline font-bold" 
    : "text-3xl md:text-4xl font-headline font-bold";

  return (
    <Component className={cn(baseClasses, className)}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-light text-primary">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Component>
  );
}
