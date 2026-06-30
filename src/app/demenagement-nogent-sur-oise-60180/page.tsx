import type { Metadata } from "next";

import { OiseLocationPage } from "@/components/oise-location-page";
import { getOiseLocation, getOiseMetadata } from "@/lib/oise-locations";

const location = getOiseLocation("nogent-sur-oise");

export const metadata: Metadata = getOiseMetadata(location.id);

export default function DemenagementNogentSurOisePage() {
  return <OiseLocationPage location={location} />;
}
