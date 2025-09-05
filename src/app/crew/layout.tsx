import type { PropsWithChildren } from 'react';
import { Logo } from '@/components/logo';

export default function CrewLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh flex flex-col bg-muted/40">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 sm:px-6">
            <Logo />
            <h1 className="ml-4 text-xl font-semibold text-muted-foreground">Portail Équipe</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}
