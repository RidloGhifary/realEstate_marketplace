import { Checkbox } from "../../components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";

const Type = (form) => {
  return (
    <div className="flex items-start justify-start gap-3">
      <span className="basis-2/6 font-semibold">Type:</span>
      <div className="mt-1 space-y-3">
        <FormField
          control={form.control}
          name="all"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Rent & Sale</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Rent</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Sale</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Offer</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Type;
