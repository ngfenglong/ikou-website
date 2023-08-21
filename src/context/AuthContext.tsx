import { createContext, useEffect, useState } from 'react';
import { AuthContextData, User } from '../model/auth';
import { RegisterFormInputDto } from '../dto/auth';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { GENERIC_ERROR_MESSAGE } from '../constants/error-messages';

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  const register = async (registerFormInput: RegisterFormInputDto) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/auth/register`,
        JSON.stringify(registerFormInput),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      throw new Error(errorMessage ?? GENERIC_ERROR_MESSAGE);
    }
  };

  const login = (username: string, password: string) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      username,
      password,
    });

    return axios
      .post(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/auth/login`,
        body,
        options
      )
      .then((response) => response.data)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.message);
        }
        const loggedInUser = {
          username: data.user.username,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          country: data.user.country,
          profile_image: data.user.profile_image,
        };
        setUser(loggedInUser);
        setIsAuthenticated(true);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      });
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // throw error
      return;
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ refresh_token: refreshToken });
    axios
      .post(
        `${process.env.REACT_APP_IKOU_API_BASEURL}/auth/logout`,
        body,
        options
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.error) {
          throw Error(data.message);
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({
        ...jwtDecode(token),
      } as User);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
