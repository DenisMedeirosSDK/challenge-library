export enum BookStatus {
  NEW = "NEW",
  USED = "USED",
  DAMAGED = "DAMAGED",
}

export interface CreateBook {
  title: string;
  edition: string;
  year: number;
  releaseDate: Date;
  status: BookStatus;
  libraryId: string;
  inventory: number;
  address: Address;
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
