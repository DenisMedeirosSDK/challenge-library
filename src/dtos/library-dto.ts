export interface Library {
  id?: string;
  name: string;
  adminId?: string | null;
  address?: Address | null;
}

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  streetNumber?: string;
  complement: string;
  latitude?: string;
  longitude?: string;
}
