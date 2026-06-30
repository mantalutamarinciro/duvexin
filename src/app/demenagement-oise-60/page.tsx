import type { Metadata } from "next";

import { OiseLocationPage } from "@/components/oise-location-page";
import { getOiseLocation, getOiseMetadata } from "@/lib/oise-locations";

const location = getOiseLocation("oise");

export const metadata: Metadata = getOiseMetadata(location.id);

export default function DemenagementOisePage() {
  return <OiseLocationPage location={location} />;
}
