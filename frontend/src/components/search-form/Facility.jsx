import { Checkbox } from "../../components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";

const Facility = (form) => {
  return (
    <div className="flex items-start justify-start gap-3">
      <span className="basis-2/6 font-semibold ">Facility:</span>
      <div className="mt-1 space-y-3">
        <FormField
          control={form.control}
          name="parking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Parking</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="furnished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Furnished</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Facility;
