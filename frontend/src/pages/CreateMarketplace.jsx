import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Checkboxes from "../components/create-marketplace/Checkboxes";
import Rooms from "../components/create-marketplace/Rooms";
import Prices from "../components/create-marketplace/Prices";
import UploadImages from "../components/create-marketplace/UploadImages";

const CreateMarketplace = () => {
  return (
    <main className="mx-auto mb-20 max-w-4xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Create a Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            className="rounded-lg border p-3"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <Textarea
            type="text"
            placeholder="Description"
            className="rounded-lg border p-3"
            id="description"
            required
          />
          <Textarea
            type="text"
            placeholder="Address"
            className="rounded-lg border p-3"
            id="address"
            required
          />
          {/* CHECKBOXES HERE */}
          <Checkboxes />
          <div className="grid grid-cols-2 gap-3">
            {/* ROOMS INPUT HERE */}
            <Rooms />
            {/* PRICES INPUT HERE */}
            <Prices />
          </div>
        </div>
        {/* UPLOAD IMAGES INPUT HERE */}
        <UploadImages />
      </form>
    </main>
  );
};

export default CreateMarketplace;
