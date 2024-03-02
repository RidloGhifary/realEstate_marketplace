import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

const Type = () => {
  return (
    <div className="flex items-start justify-start gap-3">
      <span className="basis-2/6 font-semibold">Type:</span>
      <div className="mt-1 space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox type="checkbox" id="all" />
          <Label>Rent & Sale</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox type="checkbox" id="rent" />
          <Label>Rent</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox type="checkbox" id="sale" />
          <Label>Sale</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox type="checkbox" id="offer" />
          <Label>Offer</Label>
        </div>
      </div>
    </div>
  );
};

export default Type;
