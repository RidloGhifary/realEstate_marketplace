/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaTrash } from "react-icons/fa";

const UploadImages = ({
  handleUploadImages,
  setFiles,
  uploading,
  imageUploadError,
  formData,
  handleRemoveImage,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="images">
          Picture: The first image will be the cover (max 6)
        </Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(e) => setFiles(e.target.files)}
        />
        <Button
          type="button"
          className="ml-auto mt-2"
          disabled={uploading}
          onClick={handleUploadImages}
        >
          Upload images
        </Button>
      </div>
      <p className="text-center text-sm text-rose-500">
        {imageUploadError && imageUploadError}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {formData?.imageUrls.length > 0 &&
          formData?.imageUrls.map((url, index) => (
            <div className="relative" key={url}>
              <img
                src={url}
                alt="listing image"
                className="h-20 rounded object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute inset-0  flex items-center justify-center rounded bg-transparent transition hover:bg-slate-400/30"
              >
                <FaTrash size={20} className="text-slate-900" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImages;
