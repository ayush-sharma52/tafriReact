// src/types/Package.ts
// src/types/Package.ts
export interface Package {
    id: number;
    name: string;
    destination: string;
    details: string;
    count: number;
    onHold: number;
    price: number;
    finalPrice: number;
    released: boolean;
    available: number;
    hold: boolean;
    userId: number;
  }
  

export interface PackageDTO {
    id?: number; // Add this line to include the `id` property
    name: string;
    destination: string;
    details: string;
    count: number;
    onHold: number;
    price: number;
    released: boolean;
    userId?: number;
    available?: number;
    hold?: boolean;
}
