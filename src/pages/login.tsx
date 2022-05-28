import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    document.title = 'Login Page';
  });

  return (
    
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      Login Page
    </div>
  );
};

export default Login;
