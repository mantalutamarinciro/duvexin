
import { cn } from "@/lib/utils";
import React from 'react';

// This is a server-side component
export function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {

  const parseChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      // Split the string by the <u> tags, keeping the content of the tags
      const parts = node.split(/<u>(.*?)<\/u>/g);
      
      return parts.map((part, index) => {
        // Every second part is the content of a <u> tag
        if (index % 2 === 1) {
          return <u key={index} className="text-primary font-normal">{part}</u>;
        }
        return part;
      });
    }

    // If the node is a React element and has children, recurse
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
