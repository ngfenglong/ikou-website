import { createContext, useState } from 'react';
import { AuthContextData, User } from '../model/auth';
import { RegisterFormInputDto } from '../dto/auth';

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
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormInput),
    };
    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/auth/register`, options)
      .then((response) => response.json())
      .then((data) => {
        
      })
      .catch((err) => {
        throw Error(err);
      });
  };

  const login = async (username: string, password: string) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/auth/login`, options)
      .then((response) => response.json())
      .then((data) => {
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    };
    fetch(`${process.env.REACT_APP_IKOU_API_BASEURL}/auth/logout`, options)
      .then((response) => response.json())
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

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};