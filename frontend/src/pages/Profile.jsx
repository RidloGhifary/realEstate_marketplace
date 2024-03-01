import { useEffect, useRef, useState } from "react";
import { UseAppContext } from "../context/AppContext";
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
import ProfileRightSide from "../components/ProfileRightSide";
import { Separator } from "../components/ui/separator";
import Listings from "../components/profile/Listings";
import UpdateProfile from "../components/profile/UpdateProfile";

const Profile = () => {
  const { currentUser } = UseAppContext();
  const fileRef = useRef(null);

  const [changeLeftSide, setChangeLeftSide] = useState("profile");

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
    <div className="container mx-auto mb-20 p-3">
      <h1 className="container my-16 w-[94%] text-4xl font-semibold">
        {currentUser.username}
      </h1>
      <div className="w-full items-start justify-start gap-5 md:flex">
        <div className="basis-[60%] ">
          <div className="mx-auto w-[80%]">
            <div className="flex items-center gap-10">
              <p
                className="cursor-pointer hover:underline"
                onClick={() => setChangeLeftSide("profile")}
              >
                Profile
              </p>
              <p
                className="cursor-pointer hover:underline"
                onClick={() => setChangeLeftSide("list")}
              >
                My List
              </p>
            </div>
            <Separator className="my-3 mb-10" />
          </div>
          {changeLeftSide === "profile" && (
            <UpdateProfile
              handleSubmit={handleSubmit}
              setFile={setFile}
              fileRef={fileRef}
              isLoading={isLoading}
              currentUser={currentUser}
              formData={formData}
              filePerc={filePerc}
              fileUploadError={fileUploadError}
              handleFormChange={handleFormChange}
            />
          )}

          {changeLeftSide === "list" && <Listings userId={currentUser._id} />}
        </div>
        <Separator orientation="vertical" className="h-full w-3" />
        <div className="sticky top-5 mt-7">
          <ProfileRightSide currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
