import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const Options = () => {
  return (
    <Select id="sort_order">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="regularPrice_desc">Price high to low</SelectItem>
        <SelectItem value="regularPrice_asc">Price low to high</SelectItem>
        <SelectItem value="createdAt_desc">Latest</SelectItem>
        <SelectItem value="createdAt_asc">Oldest</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Options;
