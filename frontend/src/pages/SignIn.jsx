import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import OAuth from "../components/OAuth";

import { UseSignIn } from "../api/Auth";

const SignIn = () => {
  const [seePassword, setSeePassword] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(UseSignIn, {
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Sign in successful",
      });
      navigate("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Sign in failed",
      });
    },
  });

  const { isLoading, error } = mutation;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign In</h1>
      {error && (
        <p className="mb-3 text-center text-rose-500">{error.message}</p>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            type="email"
            placeholder="email"
            className="rounded-lg border p-3"
            id="email"
            name="email"
            disabled={isLoading}
            {...register("email", {
              required: "email is required",
            })}
          />
          {errors.email && (
            <span className="text-xs text-rose-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="relative">
          <Input
            type={seePassword ? "text" : "password"}
            placeholder="password"
            className="rounded-lg border p-3"
            id="password"
            name="password"
            disabled={isLoading}
            {...register("password", {
              required: "password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
          />
          {errors.password && (
            <span className="text-xs text-rose-500">
              {errors.password.message}
            </span>
          )}
          {seePassword ? (
            <FaEyeSlash
              className="absolute right-4 top-[22%] cursor-pointer text-slate-700"
              size={20}
              onClick={() => setSeePassword(!seePassword)}
            />
          ) : (
            <FaEye
              className="absolute right-4 top-[22%] cursor-pointer text-slate-700"
              size={20}
              onClick={() => setSeePassword(!seePassword)}
            />
          )}
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
        <OAuth isLoading={isLoading} />
      </form>
      <div className="mt-5 flex gap-2">
        <p>Haven`t an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
