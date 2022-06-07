// ----------------------------------------------------------------------

export type User = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: File | any;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  role: string;
  isPublic: boolean;
};

export type AccountSession = {
  id: string;
  accessToken: string;
  avatarUrl: string | null;
  email: string;
  fullName: string;
  role: string;
  semester: string;
  status: number;
  studentCode: string;
};
