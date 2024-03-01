/* eslint-disable react/prop-types */
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Prices = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="regularPrice">Regular price / month</Label>
        <Input
          type="number"
          id="regularPrice"
          min={50}
          max={100000}
          className="rounded-lg border border-gray-300 p-3"
          value={formData.regularPrice}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="discountPrice">Discount price</Label>
        <Input
          type="number"
          id="discountPrice"
          min={50}
          max={100000}
          className="rounded-lg border border-gray-300 p-3"
          value={formData.discountPrice}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Prices;
