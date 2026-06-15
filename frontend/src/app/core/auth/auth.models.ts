export interface AuthUser {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly company: string | null;
  readonly role: string;
}

export interface AuthResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  name: string;
  company?: string | null;
}
