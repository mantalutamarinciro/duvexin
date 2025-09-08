import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <Image 
        src="/logo.png" 
        alt="Logo Demenagement Du Vexin"
        width={200}
        height={50}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}
