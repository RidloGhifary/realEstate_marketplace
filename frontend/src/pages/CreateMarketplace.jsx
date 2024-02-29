import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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

const CreateMarketplace = () => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
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

  return (
    <main className="mx-auto mb-20 max-w-4xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Create a Listing
      </h1>
      <form className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-1 flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            className="rounded-lg border p-3"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <Textarea
            type="text"
            placeholder="Description"
            className="rounded-lg border p-3"
            id="description"
            required
          />
          <Textarea
            type="text"
            placeholder="Address"
            className="rounded-lg border p-3"
            id="address"
            required
          />
          {/* CHECKBOXES HERE */}
          <Checkboxes />
          <div className="grid grid-cols-2 gap-3">
            {/* ROOMS INPUT HERE */}
            <Rooms />
            {/* PRICES INPUT HERE */}
            <Prices />
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
        <Button disabled={uploading}>Create listing</Button>
      </form>
    </main>
  );
};

export default CreateMarketplace;
