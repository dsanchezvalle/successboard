export interface PetclinicOwnerPetTypeRaw {
  id: number;
  name: string;
}

export interface PetclinicOwnerPetRaw {
  id: number;
  name: string;
  birthDate: string;
  type: PetclinicOwnerPetTypeRaw;
}

export interface PetclinicOwnerRaw {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets?: PetclinicOwnerPetRaw[];
}

export interface PetclinicOwnerDetailEmbeddedRaw {
  owner?: PetclinicOwnerRaw;
}

export interface PetclinicOwnerDetailResponseRaw {
  _embedded?: PetclinicOwnerDetailEmbeddedRaw;
}
