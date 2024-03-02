import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { FormControl, FormField, FormItem } from "../../components/ui/form";

const Options = (form) => {
  return (
    <FormField
      control={form.control}
      name="parking"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-2 space-y-0">
          <Select
            id="sort_order"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="regularPrice_desc">
                Price high to low
              </SelectItem>
              <SelectItem value="regularPrice_asc">
                Price low to high
              </SelectItem>
              <SelectItem value="createdAt_desc">Latest</SelectItem>
              <SelectItem value="createdAt_asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default Options;
