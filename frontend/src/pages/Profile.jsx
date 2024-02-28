import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

const Profile = () => {
  function censorEmail(email) {
    const atIndex = email.indexOf("@");
    return (
      email.substring(0, atIndex).replace(/.(?=.{4})/g, "*") +
      email.substring(atIndex)
    );
  }

  return (
    <div className="mx-auto w-full p-3">
      <h1 className="my-4 text-center text-3xl font-semibold">Profile</h1>
      <div className="w-full items-center justify-between gap-5 md:flex">
        <div className="basis-[60%]">
          <form className="mx-auto flex w-[80%] flex-col gap-4">
            <div className="mx-auto">
              <Avatar className="h-40 w-40">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Input
                type="text"
                placeholder="username"
                className="rounded-lg border p-3"
                id="username"
                name="username"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="email"
                className="rounded-lg border p-3"
                id="email"
                name="email"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="password"
                className="rounded-lg border p-3"
                id="password"
                name="password"
              />
            </div>

            <Button
              type="submit"
              className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
            >
              Submit
            </Button>
          </form>
        </div>
        <Separator orientation="vertical" className="bg-slate-600" />
        <div className="sticky w-full basis-[40%]">
          <div className="mb-20 space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-bold">Ridlo ghifary</h1>
            <p className="text-slate-700">Member since 8 october 2023</p>
          </div>

          <div className="space-y-[-3px]">
            <button>Sign out</button>
            <p className="text-sm text-slate-700">
              {censorEmail("Ridloghifary@gmail.com")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
