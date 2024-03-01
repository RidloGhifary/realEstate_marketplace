/* eslint-disable react/prop-types */
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Checkboxes = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          id="parking"
          className="w-4"
          onChange={handleChange}
          checked={formData.parking}
        />
        <Label htmlFor="parking">Parking spot</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          id="furnished"
          className="w-4"
          onChange={handleChange}
          checked={formData.furnished}
        />
        <Label htmlFor="furnished">Furnished</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          id="offer"
          className="w-4"
          onChange={handleChange}
          checked={formData.offer}
        />
        <Label htmlFor="offer">Offer</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="radio"
          name="type"
          id="sale"
          className="w-4"
          onChange={handleChange}
          checked={formData?.type === "sale"}
        />
        <Label htmlFor="sale">Sell</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="radio"
          name="type"
          id="rent"
          className="w-4"
          onChange={handleChange}
          checked={formData?.type === "rent"}
        />
        <Label htmlFor="rent">Rent</Label>
      </div>
    </div>
  );
};

export default Checkboxes;
