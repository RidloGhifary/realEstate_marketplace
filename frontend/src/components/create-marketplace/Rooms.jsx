import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Rooms = () => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="bedrooms">Beds</Label>
        <Input
          type="number"
          id="bedrooms"
          min="1"
          max="10"
          required
          className="rounded-lg border border-gray-300 p-3"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="bathrooms">Baths</Label>
        <Input
          type="number"
          id="bathrooms"
          min="1"
          max="10"
          required
          className="rounded-lg border border-gray-300 p-3"
        />
      </div>
    </>
  );
};

export default Rooms;
