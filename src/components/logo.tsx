export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-current"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className="font-headline text-lg font-bold text-sidebar-foreground">DemDuVexin</span>
      </div>
    </div>
  );
}
