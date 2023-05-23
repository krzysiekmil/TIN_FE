import {UserRole} from "../../shared/UserRole";

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  roles: UserRole[] | string[];
  accessToken: string;
  tokenType: string;
}
