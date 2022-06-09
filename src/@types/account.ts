// ----------------------------------------------------------------------

export type User = {
  id: string;
  email?: string | null;
  displayName: string;
  role: string;
  statusId: number;
  photoURL?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  about?: string | null;
  isPublic?: boolean | null;
};

export type AccountSession = {
  id: string;
  accessToken: string;
  avatarUrl: string | null;
  email: string;
  fullName: string;
  role: string;
  semester: string;
  statusId: number;
  studentCode: string;
};
