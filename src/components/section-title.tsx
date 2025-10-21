import { cn } from "@/lib/utils";
import React from 'react';

// This is a server-side component
export function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {

  const parseChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      const parts = node.split(/<u>(.*?)<\/u>/g);
      
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // The magic happens here: font-light and text-primary
          return <span key={index} className="text-primary font-light">{part}</span>;
        }
        return part;
      });
    }

    if (React.isValidElement(node) && (node.props as any).children) {
      return React.cloneElement(node, {
        ...node.props,
        children: React.Children.map((node.props as any).children, parseChildren)
      });
    }

    return node;
  };
  
  const processedChildren = React.Children.map(children, parseChildren);

  return (
    <h2 className={cn("text-3xl md:text-4xl font-headline font-bold section-title", className)}>
      {processedChildren}
    </h2>
  );
}
