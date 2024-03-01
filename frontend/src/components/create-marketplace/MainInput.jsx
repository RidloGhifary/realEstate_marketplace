/* eslint-disable react/prop-types */
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const MainInput = ({ formData, handleChange }) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        className="rounded-lg border p-3"
        id="name"
        value={formData?.name}
        onChange={handleChange}
      />
      <Textarea
        type="text"
        placeholder="Description"
        className="rounded-lg border p-3"
        id="description"
        value={formData?.description}
        onChange={handleChange}
      />
      <Textarea
        type="text"
        placeholder="Address"
        className="rounded-lg border p-3"
        id="address"
        value={formData?.address}
        onChange={handleChange}
      />
    </>
  );
};

export default MainInput;
