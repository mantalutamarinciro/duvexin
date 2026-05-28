export type ServiceType =
  | "eco"
  | "standard"
  | "comfort"
  | "luxury"
  | "basic"
  | "full"
  | "premium";

export interface QuoteRequestFormData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate?: string;
  volume: number;
  distance: number;
  serviceType: ServiceType;
  details?: string;
}

export type QuoteStatus =
  | "pending"
  | "accepted"
  | "refused"
  | "invoiced"
  | "converted";

export interface Quote extends Omit<QuoteRequestFormData, "moveDate"> {
  id: string;
  moveDate: string | null;
  quote: number;
  status: QuoteStatus;
  createdAt: string;
}