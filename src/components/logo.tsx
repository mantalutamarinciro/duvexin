import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <Image 
        src="/logo.jpg" 
        alt="Logo DemDuVexin"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}
