import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { UseGetDataForHomePage } from "../api/Marketplace";
import SearchList from "../components/SearchList";
import CardSkeleton from "../components/CardSkeleton";

const Home = () => {
  const offerQuery = "offer=true&limit=6";
  const rentQuery = "type=rent&limit=6";
  const saleQuery = "type=sale&limit=6";

  const {
    data: offerDataEstate,
    isLoading: isLoadingOfferDataEstate,
    error: errorOfferDataEstate,
  } = useQuery(["UseGetDataForHomePage", offerQuery], () =>
    UseGetDataForHomePage(offerQuery),
  );

  const {
    data: rentDataEstate,
    isLoading: isLoadingRentDataEstate,
    error: errorRentDataEstate,
  } = useQuery(["UseGetDataForHomePage", rentQuery], () =>
    UseGetDataForHomePage(rentQuery),
  );

  const {
    data: saleDataEstate,
    isLoading: isLoadingSaleDataOffer,
    error: errorSaleDataEstate,
  } = useQuery(["UseGetDataForHomePage", saleQuery], () =>
    UseGetDataForHomePage(saleQuery),
  );

  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-28 px-3">
        <h1 className="text-3xl font-bold text-slate-700 lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-xs text-gray-400 sm:text-sm">
          <b>Uhuyy Estate</b> is the best place to find your next perfect place
          to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs font-bold text-blue-800 hover:underline sm:text-sm"
        >
          Let&apos;s get started...
        </Link>
      </div>

      <div className="mx-auto my-10 flex max-w-6xl flex-col gap-8 p-3">
        <>
          {errorOfferDataEstate && (
            <p className="w-full rounded-md bg-rose-500 p-6 text-center text-white">
              Something went wrong
            </p>
          )}
          {isLoadingOfferDataEstate && <CardSkeleton />}
          {offerDataEstate?.length === 0 && (
            <p className="bg-slate-200-500 w-full rounded-md p-6 text-center">
              Cannot found any data
            </p>
          )}
          {offerDataEstate && offerDataEstate?.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {offerDataEstate?.map((data) => (
                  <SearchList searchData={data} key={data._id} />
                ))}
              </div>
            </div>
          )}
        </>
        <>
          {errorRentDataEstate && (
            <p className="w-full rounded-md bg-rose-500 p-6 text-center text-white">
              Something went wrong
            </p>
          )}
          {isLoadingRentDataEstate && <CardSkeleton />}
          {rentDataEstate?.length === 0 && (
            <p className="bg-slate-200-500 w-full rounded-md p-6 text-center">
              Cannot found any data
            </p>
          )}
          {rentDataEstate && rentDataEstate?.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentDataEstate?.map((data) => (
                  <SearchList searchData={data} key={data._id} />
                ))}
              </div>
            </div>
          )}
        </>
        <>
          {errorSaleDataEstate && (
            <p className="w-full rounded-md bg-rose-500 p-6 text-center text-white">
              Something went wrong
            </p>
          )}
          {isLoadingSaleDataOffer && <CardSkeleton />}
          {saleDataEstate?.length === 0 && (
            <p className="bg-slate-200-500 w-full rounded-md p-6 text-center">
              Cannot found any data
            </p>
          )}
          {saleDataEstate && saleDataEstate?.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleDataEstate?.map((data) => (
                  <SearchList searchData={data} key={data._id} />
                ))}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Home;
