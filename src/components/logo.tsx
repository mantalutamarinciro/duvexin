export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg
          role="img"
          aria-label="Logo DDV"
          width="40"
          height="40"
          viewBox="0 0 160 40"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-auto"
        >
          <title>Logo DDV Déménagement du Vexin</title>
          <g fill="#00a99d">
            <path d="M0 0h160v40H0z" />
            <g fill="#fff" fontFamily="Arial" fontWeight="bold">
              <text x="45" y="29" fontSize="24">DDV</text>
              <g fontSize="12">
                <text x="100" y="15">DEMENAGEMENT</text>
                <text x="100" y="30">DU VEXIN</text>
              </g>
            </g>
          </g>
          <path
            d="M32.5 12.3c0-.6.3-1 .8-1s.8.4.8 1v1.3h-1.6v-1.3zM25 21.3c0 .8.3 1.4.8 1.8.5.3 1.1.5 1.8.5s1.3-.2 1.8-.5c.5-.4.8-1 .8-1.8v-1.1h-5v1.1zm6.7-1.1c0-.8-.3-1.4-.8-1.8-.5-.3-1.1-.5-1.8-.5s-1.3.2-1.8.5c-.5.4-.8 1-.8 1.8v-1.5h-1.6v6.2c0 1.2.4 2.1 1.2 2.8.8.7 1.8 1 3.1 1s2.3-.3 3.1-1c.8-.7 1.2-1.6 1.2-2.8v-6.2h-1.6v1.5zm-5.9 8.6c-2.4 0-4.4-.8-6-2.5-.5-.5-.7-1-.7-1.6 0-.6.2-1.1.7-1.6.8-.7 1.8-1.3 3-1.7l3.8-1.3c.7-.2 1.3-.5 1.7-.8.4-.3.6-.7.6-1.3s-.2-.9-.6-1.3c-.4-.3-1-.5-1.7-.5-.7 0-1.3.2-1.8.5-.5.4-.8.8-.8 1.4v.5h-4.2v-.5c0-1.4.5-2.6 1.5-3.6 1-1 2.3-1.5 4-1.5s3 .5 4 1.5c1 1 1.5 2.2 1.5 3.6 0 .7-.2 1.4-.6 2-.4.6-1.1 1.1-2 1.5l-3.7 1.3c-1.2.4-2.1.9-2.6 1.4-.5.5-.8 1.1-.8 1.8 0 .6.2 1 .7 1.3.4.3 1 .5 1.7.5.7 0 1.3-.2 1.7-.5.4-.3.7-.7.8-1.1l3.5.8c-.4 1.3-1.2 2.3-2.4 3-1.2.7-2.7 1.1-4.4 1.1zM24.2 8.5c-1.1-1-2.5-1.6-4.2-1.6H10v24.5h10c1.7 0 3.2-.5 4.2-1.6 1.1-1 1.6-2.5 1.6-4.2V12.7c0-1.7-.5-3.1-1.6-4.2zm-5.8 20.3H14V9.2h4.4c1.2 0 2.2.4 3 1.1.8.8 1.2 1.8 1.2 3v11.2c0 1.2-.4 2.2-1.2 3-.8.7-1.8 1.1-3 1.1z"
            fill="#fff"
            stroke="#00a99d"
            strokeWidth=".5"
          />
        </svg>
      </div>
       <div className="hidden group-data-[collapsible=icon]:hidden lg:block">
        <span className="font-headline text-lg font-bold text-sidebar-foreground">DemDuVexin</span>
      </div>
    </div>
  );
}
