import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Prices = () => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="regularPrice">Regular price / month</Label>
        <Input
          type="number"
          id="regularPrice"
          min="50"
          max="10000000"
          required
          className="rounded-lg border border-gray-300 p-3"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="discountPrice">Discount price</Label>
        <Input
          type="number"
          id="discountPrice"
          min="0"
          max="10000000"
          required
          className="rounded-lg border border-gray-300 p-3"
        />
      </div>
    </>
  );
};

export default Prices;
