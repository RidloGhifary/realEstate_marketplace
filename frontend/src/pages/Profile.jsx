import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { IoIosCamera } from "react-icons/io";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useMutation } from "react-query";
import { UseUpdateUser } from "../api/Users";
import { toast } from "../components/ui/use-toast";

const Profile = () => {
  const { currentUser } = UseAppContext();
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const mutation = useMutation(UseUpdateUser, {
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Update successful",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Update failed",
      });
    },
  });

  const handleFileUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
    };

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutation.mutate({
        _id: currentUser._id,
        username: formData.username,
        email: formData.email,
        avatar: formData.avatar,
      });
    } catch (error) {
      console.log("[Error while updating data]", error);
      throw new Error("Something went wrong");
    }
  };

  const { isLoading } = mutation;

  return (
    <div className="mx-auto w-full p-3">
      <h1 className="my-4 text-center text-3xl font-semibold">Profile</h1>
      <div className="w-full items-center justify-between gap-5 md:flex">
        <div className="basis-[60%]">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-[80%] flex-col gap-4"
          >
            <div className="mx-auto">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                disabled={isLoading}
              />
              <div className="relative cursor-pointer">
                <Avatar
                  className="h-40 w-40"
                  onClick={() => fileRef.current.click()}
                >
                  <AvatarImage src={formData.avatar || currentUser?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-300/10 transition hover:bg-slate-300/50">
                    <IoIosCamera size={50} className="text-slate-400" />
                  </div>
                </Avatar>
              </div>
            </div>
            <p className="self-center text-sm">
              {filePerc > 0 && filePerc < 100 && (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              )}

              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 3 mb)
                </span>
              ) : fileUploadError !== true && filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
            <div>
              <Input
                type="text"
                placeholder="username"
                className="rounded-lg border p-3"
                id="username"
                name="username"
                disabled={isLoading}
                defaultValue={currentUser.username}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="email"
                className="rounded-lg border p-3"
                id="email"
                name="email"
                defaultValue={currentUser.email}
                disabled
              />
            </div>
            {/* <div>
              <Input
                type="password"
                placeholder="password"
                className="rounded-lg border p-3"
                id="password"
                name="password"
              />
            </div> */}

            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
            >
              Update
            </Button>
          </form>
        </div>
        <Separator orientation="vertical" className="bg-slate-600" />
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
            <button>Sign out</button>
            <p className="text-sm text-slate-700">{currentUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
