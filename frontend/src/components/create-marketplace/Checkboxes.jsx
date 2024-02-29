import { Checkbox } from "../ui/checkbox";

const Checkboxes = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex items-center gap-2">
        <Checkbox type="checkbox" id="sale" className="w-4" />
        <label htmlFor="sale">Sell</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox type="checkbox" id="rent" className="w-4" />
        <label htmlFor="rent">Rent</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox type="checkbox" id="parking" className="w-4" />
        <label htmlFor="parking">Parking spot</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox type="checkbox" id="furnished" className="w-4" />
        <label htmlFor="furnished">Furnished</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox type="checkbox" id="offer" className="w-4" />
        <label htmlFor="offer">Offer</label>
      </div>
    </div>
  );
};

export default Checkboxes;
