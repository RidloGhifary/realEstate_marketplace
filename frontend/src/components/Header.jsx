import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { UseAppContext } from "../context/AppContext.jsx";
import { Input } from "./ui/input";
import { IoReload } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../components/ui/form";
import { Button } from "./ui/button";
// import { UseSearchEstate } from "../api/Marketplace";
// import { useMutation } from "react-query";

const Header = () => {
  const { currentUser, isLoggedIn, fetchUserLoading } = UseAppContext();
  const navigate = useNavigate();

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

  // const { mutate, isLoading } = useMutation(UseSearchEstate, {
  //   onSuccess: (data) => {
  //     return data;
  //   },
  // });

  const onSubmit = (data) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("searchTerm", data.search);
    const searchQuery = urlSearchParams.toString();
    navigate(`/search?${searchQuery}`);
    // mutate(searchQuery);
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <Link to="/">
          <h1 className="flex flex-wrap text-xl font-bold sm:text-2xl md:text-3xl">
            <span className="text-slate-500">Uhuyy</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="hidden items-center rounded-lg bg-slate-100 p-1 md:flex md:p-2 md:px-3"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        // disabled={isLoading}
                        {...field}
                        type="text"
                        placeholder="Search..."
                        className="w-40 bg-transparent focus:outline-none sm:w-64"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                // disabled={isLoading}
                type="submit"
                variant="ghost"
                className="p-0"
              >
                <FaSearch className="text-slate-600" />
              </Button>
            </form>
          </Form>
          <div className="block md:hidden">
            <Input type="text" placeholder="Search" />
          </div>

          <div className="block lg:hidden">
            <MobileMenu />
          </div>
          <ul className="hidden items-center gap-4 lg:flex">
            <Link to="/">
              <li className="hidden text-slate-700 hover:underline sm:inline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden text-slate-700 hover:underline sm:inline">
                About
              </li>
            </Link>
            <Link to="/profile" className={isLoggedIn ? "block" : "hidden"}>
              <li className="flex items-center gap-2">
                {fetchUserLoading && (
                  <IoReload size={30} className="animate-spin" />
                )}
                <Avatar>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{currentUser?.username}</span>
              </li>
            </Link>

            <Link to="/sign-in" className={isLoggedIn ? "hidden" : "block"}>
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
