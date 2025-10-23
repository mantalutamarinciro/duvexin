
import { cn } from "@/lib/utils";
import React from 'react';

// This is a server-side component
export function SectionTitle({ children, className, as: Component = "h2" }: { children: React.ReactNode, className?: string, as?: 'h1' | 'h2' | 'h3' | 'span' }) {

  const parseChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return node;
    }

    if (React.isValidElement(node)) {
        // Look for <u> tags to apply the special styling
        if (node.type === 'u') {
            return <span className="font-light text-primary">{node.props.children}</span>
        }
        
        if (node.props.children) {
            return React.cloneElement(node, {
                ...node.props,
                children: React.Children.map(node.props.children, parseChildren)
            });
        }
    }

    return node;
  };
  
  const processedChildren = React.Children.map(children, parseChildren);

  return (
    <Component className={cn("text-3xl md:text-4xl font-headline font-bold", className)}>
      {processedChildren}
    </Component>
  );
}
