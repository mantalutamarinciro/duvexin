import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";

export default function OisePublicLayout({ children }: PropsWithChildren) {
  return <LandingLayout>{children}</LandingLayout>;
}
