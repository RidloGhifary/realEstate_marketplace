import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";
import Type from "../components/search-form/Type";
import Facility from "../components/search-form/Facility";
import Options from "../components/search-form/Options";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b-2 p-7 md:min-h-screen md:border-r-2">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full rounded-lg border p-3"
            />
          </div>
          <Type />
          <Facility />
          <Options />
          <Button>Search</Button>
        </form>
      </div>

      {/* <div className="flex-1">
        <h1 className="mt-5 border-b p-3 text-3xl font-semibold text-slate-700">
          Listing results:
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="w-full text-center text-xl text-slate-700">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

            <button
              className="w-full p-7 text-center text-green-700 hover:underline"
            >
              Show more
            </button>
        </div>
      </div> */}
    </div>
  );
};

export default Search;
