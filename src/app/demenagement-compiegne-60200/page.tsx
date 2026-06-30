import type { Metadata } from "next";

import { OiseLocationPage } from "@/components/oise-location-page";
import { getOiseLocation, getOiseMetadata } from "@/lib/oise-locations";

const location = getOiseLocation("compiegne");

export const metadata: Metadata = getOiseMetadata(location.id);

export default function DemenagementCompiegnePage() {
  return <OiseLocationPage location={location} />;
}
