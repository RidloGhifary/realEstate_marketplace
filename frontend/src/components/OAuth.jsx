/* eslint-disable react/prop-types */
import { FaGoogle } from "react-icons/fa";
import { Button } from "./ui/button";

import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { useMutation } from "react-query";
import { UseGoogle } from "../api/Auth";
import { toast } from "./ui/use-toast";

const OAuth = ({ isLoading }) => {
  const navigate = useNavigate();

  const mutation = useMutation(UseGoogle, {
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

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      mutation.mutate({
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleGoogle}
      type="button"
      className="flex items-center gap-1 rounded-lg bg-rose-700 p-3 uppercase text-white hover:bg-rose-700/90 disabled:bg-rose-700/80"
    >
      <FaGoogle size={17} className="text-white" />
      {isLoading ? "Loading..." : "Sign up with Google"}
    </Button>
  );
};

export default OAuth;
