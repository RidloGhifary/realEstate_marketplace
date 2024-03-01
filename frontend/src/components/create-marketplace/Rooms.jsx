/* eslint-disable react/prop-types */
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Rooms = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="bedrooms">Beds</Label>
        <Input
          type="number"
          id="bedrooms"
          className="rounded-lg border border-gray-300 p-3"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="bathrooms">Baths</Label>
        <Input
          type="number"
          id="bathrooms"
          className="rounded-lg border border-gray-300 p-3"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Rooms;
