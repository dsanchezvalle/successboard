export interface CustomerDetail {
  id: number;
  fullName: string;
  address: string | null;
  city: string | null;
  telephone: string | null;
  pets: Array<{
    id: number;
    name: string;
    birthDate: string;
    type: string;
  }>;
}
