import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const UploadImages = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="images">
          Picture: The first image will be the cover (max 6)
        </Label>
        <Input id="images" type="file" multiple />
        <Button className="ml-auto mt-2">Upload images</Button>
      </div>
      <p className="text-sm text-red-700"></p>
      <Button>Create listing</Button>
    </div>
  );
};

export default UploadImages;
