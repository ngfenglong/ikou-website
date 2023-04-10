export interface LoginResponse {
  error: boolean;
  message: string;
  accessT_tken: string;
  refresh_token: string;
  expiry: Date;
  user: UserDto;
}

export interface UserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  profile_image: string;
}

export interface RegisterFormInputDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image: string;
  country: string;
}
