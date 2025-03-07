export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  streetAddress: string;
  details?: string;
  type: string;
  isDefault: boolean;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  addresses?: Address[]; // Add this line
}

// Address Schema

export interface LocationResult {
  formatted: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface OpenCageComponent {
  state?: string;
  city?: string;
  county?: string;
  suburb?: string;
  neighbourhood?: string;
  postcode?: string;
}

export interface OpenCageResult {
  formatted: string;
  components: OpenCageComponent;
  geometry: {
    lat: number;
    lng: number;
  };
}
