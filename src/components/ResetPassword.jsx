import { useEffect, useState } from "react";
import { useAddPassword } from "../lib/mutations";
import { useNavigate } from "react-router-dom";
import PasswordVisibility from "./PasswordVisibility";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [compatabilityError, setCompatabilityError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);

  const resetPasswordMutation = useAddPassword();
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const isValidPassword = passwordRegex.test(password);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmedPassword && isValidPassword) {
      resetPasswordMutation.mutate(
        {
          token: "",
          secret: "",
          password: password,
          password_confirm: confirmedPassword,
        },
        {
          onError: (err) => {
            if (err) setIsError(true);
          },
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    }
  };
  
  useEffect(() => {
    password !== confirmedPassword
      ? setCompatabilityError(true)
      : setCompatabilityError(false);
  }, [confirmedPassword, password]);

  return (
    <>
      <div className="flex relative min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
        {isError && (
          <div className="block w-fit absolute top-4 right-4 p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
            An error occurred. Try again later
          </div>
        )}
        <div className="sm:mx-auto flex flex-col items-center sm:w-full sm:max-w-sm">
          <img alt="logo" className="w-fit" src="logo.svg" />

          <h2 className="mt-20 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Password?
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="new_password"
              className="block text-sm mb-2 font-medium leading-6 text-mainBlack">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="new_password"
                name="new_password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern=".{8,}"
                className="block w-full rounded-md peer border-0 p-3 shadow-sm ring-1 ring-inset ring-gray-300 text-blackColor placeholder:text-[#A1ABB5] sm:text-sm sm:leading-6"
              />
              <PasswordVisibility
                isPasswordVisible={isPasswordVisible}
                setIsPasswordVisible={setIsPasswordVisible}
              />
              {password.length > 0 && (
                <p className="hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block text-red-700 font-light">
                  Password should be at least 8 characters long.
                </p>
              )}
            </div>
            <div className="my-6">
              <label
                htmlFor="confirmedPassword"
                className="block text-sm font-medium mb-2 leading-6 text-mainBlack">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={isConfirmedPasswordVisible ? "text" : "password"}
                  id="confirmedPassword"
                  name="confirmedPassword"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  required
                  pattern=".{8,}"
                  className="block w-full peer rounded-md border-0 p-3 shadow-sm ring-1 ring-inset ring-gray-300 text-blackColor placeholder:text-[#A1ABB5] sm:text-sm sm:leading-6"
                />
                <PasswordVisibility
                  isPasswordVisible={isConfirmedPasswordVisible}
                  setIsPasswordVisible={setIsConfirmedPasswordVisible}
                />
                {confirmedPassword.length > 0 && (
                  <p className="hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block text-red-700 font-light">
                    Password should be at least 8 characters long.
                  </p>
                )}
                {compatabilityError && (
                  <p className=" text-red-700 font-light">
                    Passwords should match.
                  </p>
                )}
                {password.length > 0 &&
                  confirmedPassword.length > 0 &&
                  !compatabilityError &&
                  !isValidPassword && (
                    <p className=" text-red-700 font-light">
                      Password is not strong. Should be at least 8 characters
                      long, contain at least one numeric, one uppercase letter
                      and one lowercase letter
                    </p>
                  )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-mainBlue p-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
