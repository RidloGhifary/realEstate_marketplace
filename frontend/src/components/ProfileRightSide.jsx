/* eslint-disable react/prop-types */
import { UseSignOut } from "../api/Auth";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useMutation } from "react-query";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const ProfileRightSide = ({ currentUser }) => {
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation(UseSignOut, {
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Logout successful",
      });
      navigate("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Logout failed",
      });
    },
  });

  return (
    <div className="sticky w-full basis-[40%]">
      <div className="mb-20 space-y-3">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentUser?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold">{currentUser?.username}</h1>
          <p className="text-sm text-slate-700">
            Member since{" "}
            <span className="font-semibold">
              {new Date(currentUser?.createdAt).getDate()}-
              {new Date(currentUser?.createdAt).getFullYear()}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-[-3px]">
        <button onClick={() => mutateAsync()} disabled={isLoading}>
          Sign out
        </button>
        <p className="text-sm text-slate-700">{currentUser?.email}</p>
      </div>
    </div>
  );
};

export default ProfileRightSide;
