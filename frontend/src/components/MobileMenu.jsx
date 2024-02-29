import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet.jsx";
import { FiMenu } from "react-icons/fi";
import { UseAppContext } from "../context/AppContext.jsx";

const MobileMenu = () => {
  const { isLoggedIn } = UseAppContext();

  return (
    <Sheet>
      <SheetTrigger>
        <FiMenu size={27} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="mt-4 flex flex-col justify-center gap-3">
            <Link
              to="/"
              className="rounded-md p-4 text-lg transition hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-md p-4 text-lg transition hover:bg-slate-100"
            >
              About
            </Link>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="rounded-md p-4 text-lg transition hover:bg-slate-100"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/sign-in"
                className="rounded-md p-4 text-lg transition hover:bg-slate-100"
              >
                Sign in
              </Link>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
