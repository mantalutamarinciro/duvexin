export const serviceTypeLabels = {
  basic: "Formule Économique",
  full: "Formule Standard",
  premium: "Formule Confort",
} as const;

export type ServiceType = keyof typeof serviceTypeLabels;
