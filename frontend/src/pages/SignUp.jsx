import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "../components/ui/use-toast";

import { useNavigate } from "react-router-dom";

import { UseSignUp } from "../api/Auth";

import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [seePassword, setSeePassword] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(UseSignUp, {
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Sign up successful",
      });
      navigate("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Sign up failed",
      });
    },
  });

  const { isLoading, error } = mutation;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>
      {error && (
        <p className="mb-3 text-center text-rose-500">{error.message}</p>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            placeholder="username"
            className="rounded-lg border p-3"
            id="username"
            name="username"
            disabled={isLoading}
            {...register("username", {
              required: "username is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.username && (
            <span className="text-xs text-rose-500">
              {errors.username.message}
            </span>
          )}
        </div>
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
        <div className="relative">
          <Input
            type={seePassword ? "text" : "password"}
            placeholder="confirm password"
            className="rounded-lg border p-3"
            id="confirmPassword"
            name="confirmPassword"
            disabled={isLoading}
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) return "Confirm password is required";
                else if (watch("password") !== value)
                  return "Your password do no match";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-rose-500">
              {errors.confirmPassword.message}
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
          {isLoading ? "Loading.." : "Sign up"}
        </Button>
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
