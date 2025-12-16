import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#09022c] via-[#12074f] to-[#1a0b6d] px-4">
      <div className="w-full max-w-md rounded-2xl  backdrop-blur-xl shadow-2x p-6">
        <SignIn
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default Signin;
