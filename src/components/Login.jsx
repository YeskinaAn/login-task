import { useState } from "react";
import { useLogin } from "../lib/mutations";
import PasswordVisibility from "./PasswordVisibility";

const Login = () => {
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onError: (err) => {
          if (err) setIsError(true);
        },
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <>
      <div className="flex relative  min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
        {isError && (
          <div className="block w-fit absolute top-4 right-4 p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
            Account not found
          </div>
        )}
        <div className="sm:mx-auto flex flex-col items-center sm:w-full sm:max-w-sm">
          <img alt="logo" className="w-fit" src="logo.svg" />

          <h2 className="mt-20 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex space-x-4 w-full justify-between">
            <button
              className="flex w-1/2 py-[14px] rounded-md border border-borderColor justify-center items-center"
              href="#">
              <img alt="google" src="google.svg" />
              <p className="pl-3 font-medium text-blackColor text-sm">Google</p>
            </button>
            <button
              className="flex w-1/2 py-[14px] rounded-md border border-borderColor justify-center items-center"
              href="#">
              <img alt="github" src="github.svg" />
              <p className="pl-3 font-medium text-blackColor text-sm">Github</p>
            </button>
          </div>
          <div className="my-8 border-t relative border-[#E3E6E9]">
            <p className="text-xs absolute left-[45%] -top-[7px] bg-white px-2 text-[#BEC5CC] font-medium">
              OR
            </p>
          </div>
          <form className=" novalidate" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2 mb-6">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-3 peer text-blackColor shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#A1ABB5] sm:text-sm sm:leading-6"
                />
                {email.length > 0 && (
                  <p className="hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block text-red-700 font-light">
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
            {email.length > 0 && (
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  pattern=".{8,}"
                  className="block peer  w-full rounded-md border-0 p-3 shadow-sm ring-1 ring-inset ring-gray-300 text-blackColor placeholder:text-[#A1ABB5] sm:text-sm sm:leading-6"
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
                <div className="flex items-center justify-end mt-4 mb-8">
                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="text-mainBlue select-none text-sm font-medium">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full group-invalid:pointer-events-none group-invalid:opacity-30 justify-center rounded-md bg-mainBlue p-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Log in to Qencode
              </button>
              <div className="flex justify-center items-center mt-5">
                <p className="font-medium text-blackColor text-sm">
                  Is your company new to Qencode?
                </p>
                <button className="text-mainBlue font-medium ml-1 text-sm">
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
