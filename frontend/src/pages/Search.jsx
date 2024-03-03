import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Type from "../components/search-form/Type";
import Facility from "../components/search-form/Facility";
import Options from "../components/search-form/Options";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../components/ui/form";
import { UseSearchEstate } from "../api/Marketplace";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import SearchList from "../components/SearchList";
import CardSkeleton from "../components/CardSkeleton";

const Search = () => {
  const form = useForm({
    defaultValues: {
      searchTerm: "",
      type: "all",
      parking: false,
      furnished: false,
      offer: false,
      sort: "createdAt",
      order: "desc",
    },
  });
  const navigate = useNavigate();

  const {
    mutate,
    data: searchData,
    isLoading,
  } = useMutation(UseSearchEstate, {
    onSuccess: (data) => {
      return data;
    },
  });

  const handleSubmit = (data) => {
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", data.searchTerm);
    urlParams.set("type", data.type);
    urlParams.set("parking", data.parking);
    urlParams.set("furnished", data.furnished);
    urlParams.set("offer", data.offer);

    const sort = data.sort.split("_")[0] || "createdAt";
    const order = data.sort.split("_")[1] || "desc";

    urlParams.set("sort", sort);
    urlParams.set("order", order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    mutate(searchQuery);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 p-7 md:min-h-screen md:border-r-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-lg border p-3"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Type form={form} />
            <Facility form={form} />
            <Options form={form} />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>

      <div className="flex-1">
        <h1 className="mt-5 border-b p-3 text-3xl font-semibold text-slate-700">
          Listing results: {searchData?.length} found
        </h1>
        <div className="grid grid-cols-3 gap-4 p-7">
          {!isLoading && searchData?.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {isLoading && <CardSkeleton />}

          {!isLoading &&
            searchData &&
            searchData.map((listing) => (
              <SearchList key={listing._id} searchData={listing} />
            ))}
        </div>
        {searchData?.length > 1 && (
          <Button variant="link" className="my-5 block w-full">
            Show more
          </Button>
        )}
      </div>
    </div>
  );
};

export default Search;
