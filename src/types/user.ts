interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface FirebaseResponse {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  providerData: ProviderData[];
}

export interface UserRequest extends Record<string, unknown> {
  uid: string;
  email: string;
  emailVerified: boolean;
  role?: string;
  phoneNumber?: string | null;
  photoURL?: string | null;
}
