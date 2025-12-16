import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#09022c] via-[#12074f] to-[#1a0b6d] px-4">
      <div className="w-full max-w-md rounded-2xl  backdrop-blur-xl shadow-2x p-6">
        <SignUp path="/sign-up" signInUrl="sign-in" />
      </div>{" "}
    </div>
  );
};

export default Signup;
