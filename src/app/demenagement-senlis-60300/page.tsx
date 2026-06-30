import type { Metadata } from "next";

import { OiseLocationPage } from "@/components/oise-location-page";
import { getOiseLocation, getOiseMetadata } from "@/lib/oise-locations";

const location = getOiseLocation("senlis");

export const metadata: Metadata = getOiseMetadata(location.id);

export default function DemenagementSenlisPage() {
  return <OiseLocationPage location={location} />;
}
