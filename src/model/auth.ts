import { RegisterFormInputDto } from "../dto/auth";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  profile_image: string;

  // Store likes, myPlaces, myActivities, etc
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (registerFormInput: RegisterFormInputDto) => void;
}
