export interface GymDetails {
  id: number;
  gymName: string;
  location: string;
  contactNumber1: string;
  contactNumber2?: string | null;
  email: string;
  socialLink1?: string | null;
  socialLink2?: string | null;
  socialLink3?: string | null;
  gymAdminId: number;
  status: string;
}

export interface GymResponse {
  status: string;
  message: string;
  data: GymDetails;
}
