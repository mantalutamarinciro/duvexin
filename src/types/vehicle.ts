export const vehicleTypes = [
  "Fourgon",
  "Camion 12m³",
  "Camion 20m³",
  "Camionnette",
  "Poids Lourd",
] as const;

export type VehicleType = (typeof vehicleTypes)[number];

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  insuranceExpiryDate?: string;
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
}