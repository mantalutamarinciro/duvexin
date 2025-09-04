export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent">
        <span className="text-xl font-bold text-sidebar-accent-foreground">DDV</span>
      </div>
      <span className="hidden truncate font-headline text-xl font-bold text-sidebar-foreground group-data-[state=expanded]:inline">DemDuVexin</span>
    </div>
  );
}
