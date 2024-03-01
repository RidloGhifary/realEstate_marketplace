/* eslint-disable react/prop-types */
import { IoIosCamera } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UpdateProfile = ({
  handleSubmit,
  setFile,
  fileRef,
  isLoading,
  currentUser,
  formData,
  filePerc,
  fileUploadError,
  handleFormChange,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-5 flex w-[80%] flex-col gap-4"
    >
      <div className="mx-auto">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          disabled={isLoading}
        />
        <div className="relative cursor-pointer">
          <Avatar className="h-40 w-40" onClick={() => fileRef.current.click()}>
            <AvatarImage src={formData.avatar || currentUser?.avatar} />
            <AvatarFallback>CN</AvatarFallback>
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-300/10 transition hover:bg-slate-300/50">
              <IoIosCamera size={50} className="text-slate-400" />
            </div>
          </Avatar>
        </div>
      </div>
      <p className="self-center text-sm">
        {filePerc > 0 && filePerc < 100 && (
          <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
        )}

        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 3 mb)
          </span>
        ) : fileUploadError !== true && filePerc === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : (
          ""
        )}
      </p>
      <div>
        <Input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
          name="username"
          disabled={isLoading}
          defaultValue={currentUser.username}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
          name="email"
          defaultValue={currentUser.email}
          disabled
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
      >
        Update
      </Button>
    </form>
  );
};

export default UpdateProfile;
