export const vehicleTypes = [
  "Fourgon",
  "Camion 12m³",
  "Camion 20m³",
  "Camionnette",
  "Poids Lourd",
] as const;

export type VehicleType = (typeof vehicleTypes)[number];

export type VehicleStatus = "Disponible" | "En maintenance" | "En mission";

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  insuranceExpiryDate?: string;
  status?: VehicleStatus;
  createdAt: string;
}

export interface VehicleFormData {
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  insuranceExpiryDate?: string;
  status?: VehicleStatus;
}