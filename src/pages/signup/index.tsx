import { useState, useEffect } from 'react';
import { Logo } from '../../components/logo/Logo';
import useAuth from '../../hooks/useAuth';
import { RegisterFormInputDto } from '../../dto/auth';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from './../../constants/routes';
import useAlert from '../../hooks/useAlert';
import { ALERT_TYPE } from '../../constants/theme-config';
import Alert from '../../components/alert/Alert';
import WarningBanner from '../../components/warning-banner/WarningBanner';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('Singapore');

  const { alertType, alertHeader, alertDescription, displayAlert, resetAlert } =
    useAlert();

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Signup Page';
    resetAlert();
  });

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetAlert();

    // validation & handling
    if (password !== confirmPassword) {
      displayAlert(
        ALERT_TYPE.ERROR,
        'Password Mismatch!',
        'The password and confirmation password you entered do not match. Please re-enter your password and try again.'
      );
      return;
    }

    // if no error
    const newRegistrant = {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      country: country,
    } as RegisterFormInputDto;

    try {
      await register(newRegistrant);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      // Handle error
      displayAlert(ALERT_TYPE.ERROR, 'Registration Failed!', `${err}`);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-20 w-auto" />
        <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      {/* Warning Messages */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <WarningBanner
          title="⚠️ Ikou is in active development!"
          message="Data or accounts may occasionally be reset. Please refrain from
          using personal or sensitive information.\nThank you for your understanding."
        ></WarningBanner>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mt-6">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={onSignup}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    autoComplete="current-confirm-password"
                    required
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Singapore">Singapore</option>
                    <option value="United States">United States</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-8 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>

              {alertType && (
                <Alert
                  alertType={alertType}
                  alertHeader={alertHeader ?? ''}
                  alertDescription={alertDescription ?? ''}
                />
              )}

              <div className="text-sm">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
