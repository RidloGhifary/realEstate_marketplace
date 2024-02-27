import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
        />

        <button className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
