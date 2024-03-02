import Checkboxes from "../components/create-marketplace/Checkboxes";
import Rooms from "../components/create-marketplace/Rooms";
import Prices from "../components/create-marketplace/Prices";
import UploadImages from "../components/create-marketplace/UploadImages";
import { Button } from "../components/ui/button";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import MainInput from "../components/create-marketplace/MainInput";
import { useMutation, useQuery } from "react-query";
import {
  UseCreateMarketplace,
  UseGetMarketplaceById,
  UseUpdateMarketplace,
} from "../api/Marketplace";
import { UseAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const CreateMarketplace = () => {
  const { currentUser } = UseAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { search } = useLocation();
  const estateId = search.split("/")[1];

  const { data: estateDatas } = useQuery(
    ["UseGetMarketplaceById", estateId],
    () => UseGetMarketplaceById(estateId),
  );

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: estateDatas?.imageUrls || [],
    name: estateDatas?.name || "",
    description: estateDatas?.description || "",
    address: estateDatas?.address || "",
    type: estateDatas?.type || "rent",
    bedrooms: estateDatas?.bedrooms || 1,
    bathrooms: estateDatas?.bathrooms || 1,
    regularPrice: estateDatas?.regularPrice || 50,
    discountPrice: estateDatas?.discountPrice || 0,
    offer: estateDatas?.offer || false,
    parking: estateDatas?.parking || false,
    furnished: estateDatas?.furnished || false,
  });

  const handleUploadImages = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  // TODO - CREATE LIST ESTATE
  const {
    mutate,
    isLoading,
    isError,
    data: createMarketplaceData,
  } = useMutation(UseCreateMarketplace, {
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Successfully uploaded",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to upload",
      });
    },
  });

  // TODO - UPDATE LIST ESTATE
  const {
    mutate: updateListEstate,
    isLoading: updateListLoading,
    isError: updateListIsError,
    data: updateListEstateData,
  } = useMutation(UseUpdateMarketplace, {
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      toast({
        variant: "success",
        description: "Successfully updated",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to update",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      updateListEstate({ ...formData, estateId });
      navigate(`/profile`);
      navigate(`/estate/${estateId}`);
    } else {
      mutate({ ...formData, userRef: currentUser._id });
      navigate("/profile");
      // navigate(`/estate/${createMarketplaceData._id}`);
    }
  };

  return (
    <main className="mx-auto mb-20 max-w-4xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        {`${search ? "Update" : "Create"} a Listing`}
      </h1>
      {isError ||
        (updateListIsError && (
          <p className="text-center text-rose-500">something went wrong</p>
        ))}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-2"
        disabled={isLoading}
      >
        <div className="flex flex-1 flex-col gap-4">
          {/* NAME, DESCRIPTION AND ADDRESS INPUTS HERE */}
          <MainInput formData={formData} handleChange={handleChange} />
          {/* CHECKBOXES HERE */}
          <Checkboxes formData={formData} handleChange={handleChange} />
          <div className="grid grid-cols-2 gap-3">
            {/* ROOMS INPUT HERE */}
            <Rooms formData={formData} handleChange={handleChange} />
            {/* PRICES INPUT HERE */}
            <Prices formData={formData} handleChange={handleChange} />
          </div>
        </div>
        {/* UPLOAD IMAGES INPUT HERE */}
        <UploadImages
          handleUploadImages={handleUploadImages}
          setFiles={setFiles}
          uploading={uploading}
          imageUploadError={imageUploadError}
          handleRemoveImage={handleRemoveImage}
          formData={formData}
        />
        <Button disabled={isLoading || updateListLoading || uploading}>
          {isLoading
            ? "Loading..."
            : search
              ? "Update listing"
              : "Create listing"}
        </Button>
      </form>
    </main>
  );
};

export default CreateMarketplace;
