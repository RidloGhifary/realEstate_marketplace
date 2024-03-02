import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

const Facility = () => {
  return (
    <div className="flex items-start justify-start gap-3">
      <span className="basis-2/6 font-semibold ">Facility:</span>
      <div className="mt-1 space-y-3">
        <div className="flex gap-2">
          <Checkbox type="checkbox" id="parking" />
          <Label>Parking</Label>
        </div>
        <div className="flex gap-2">
          <Checkbox type="checkbox" id="furnished" />
          <Label>Furnished</Label>
        </div>
      </div>
    </div>
  );
};

export default Facility;
