import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../ui/checkbox";

const Type = (form) => {
  return (
    <div className="flex items-start justify-start gap-3">
      <span className="basis-2/6 font-semibold">Type:</span>
      <div className="mt-1 space-y-3">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={"all"}>
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel>Rent & Sale</FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="rent" />
                    </FormControl>
                    <FormLabel>Rent</FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sale" />
                    </FormControl>
                    <FormLabel>Sale</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
