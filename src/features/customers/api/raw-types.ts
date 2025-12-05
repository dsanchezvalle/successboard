export interface PetclinicOwnerPetType {
  id: number;
  name: string;
}

export interface PetclinicOwnerPetVisit {
  id: number;
  date: string;
  description: string;
}

export interface PetclinicOwnerPet {
  id: number;
  name: string;
  birthDate: string;
  type: PetclinicOwnerPetType;
  visits?: PetclinicOwnerPetVisit[];
}

export interface PetclinicOwner {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets?: PetclinicOwnerPet[];
}

export interface PetclinicOwnersPageInfo {
  size?: number;
  totalElements?: number;
  totalPages?: number;
  number?: number;
}

export interface PetclinicOwnersEmbeddedWrapper {
  owners?: PetclinicOwner[];
  ownerList?: PetclinicOwner[];
}

export interface PetclinicOwnersResponseHalLinksSelf {
  href: string;
}

export interface PetclinicOwnersResponseHalLinks {
  self?: PetclinicOwnersResponseHalLinksSelf;
  [rel: string]: PetclinicOwnersResponseHalLinksSelf | undefined;
}

export type PetclinicOwnersResponse =
  | PetclinicOwner[]
  | {
      _embedded?: PetclinicOwnersEmbeddedWrapper;
      _links?: PetclinicOwnersResponseHalLinks;
      page?: PetclinicOwnersPageInfo;
      content?: PetclinicOwner[];
    };
