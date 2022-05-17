export const BookStateList = {
  NEW: "NEW",
  USED: "USED",
  DAMAGED: "DAMAGED",
};

export type BookStateList = typeof BookStateList[keyof typeof BookStateList];

export enum BookState {
  NEW = "NEW",
  USED = "USED",
  DAMAGED = "DAMAGED",
}

export interface CreateBook {
  title: string;
  edition: string;
  year: number;
  releaseDate: Date;
  state: BookState;
  libraryId: string;
  inventory: number;
  address?: Address;
}

export interface ListBook {
  title: string;
  edition: string;
  year: number;
  releaseDate: Date;
  state: BookStateList | null;
  inventory: number;
  address?: Address;
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
