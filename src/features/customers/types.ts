export interface Customer {
  id: string;
  name: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  petsCount?: number;
  createdFrom: "petclinic" | "mock";
}
