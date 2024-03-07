import { useState } from "react";
import { useForgotPassword } from "../lib/mutations";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const forgotPasswordMutation = useForgotPassword();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    forgotPasswordMutation.mutate({
      email: email,
    });
    setEmail("");
    navigate("/reset-password");
  };
  return (
    <>
      <div className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto flex flex-col items-center sm:w-full sm:max-w-sm">
          <img alt="logo" className="w-fit" src="logo.svg" />
          <h2 className="mt-20 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password?
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md peer border-0 p-3 text-blackColor shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#A1ABB5] sm:text-sm sm:leading-6"
                />
                {email.length > 0 && (
                  <p className="hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block text-red-700 font-light">
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-mainBlue p-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Send
              </button>
              <a
                href="/"
                className="flex w-full py-[14px border border-borderColor justify-center items-center rounded-md bg-white p-3 text-sm font-semibold leading-6 text-blackColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
