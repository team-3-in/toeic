export interface CredentialProps {
  email: string;
  password: string;
}

export interface Payload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  phone: string;
  role: string;
  session_id: string;
  app_metadata: AppMeta;
}

export interface AppMeta {
  provider: string;
  providers: string[];
  userrole: string;
}
