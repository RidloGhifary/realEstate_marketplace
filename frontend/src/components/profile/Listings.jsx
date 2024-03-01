/* eslint-disable react/prop-types */
import { UseGetMarketplaceByUserId } from "../../api/Marketplace";
import { useQuery } from "react-query";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Link } from "react-router-dom";

const Listings = ({ userId }) => {
  const {
    data: dataListings,
    isLoading,
    isError,
    error,
  } = useQuery(["marketplace", userId], () =>
    UseGetMarketplaceByUserId(userId),
  );

  return (
    <div className="mx-auto w-[80%] space-y-10">
      {isError && (
        <p className="w-full rounded-md bg-rose-200 p-10 text-center">
          {error}
        </p>
      )}
      {isLoading && (
        <p className="w-full rounded-md bg-slate-200 p-10 text-center">
          Loading...
        </p>
      )}
      {dataListings?.map((data, index) => (
        <>
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="w-full basis-3/4 space-y-3">
              <span className="text-sm text-slate-700">
                Created - {moment(data.createdAt).format("MMMM Do YYYY")}
              </span>
              <h1 className="line-clamp-1 text-3xl font-bold">{data.name}</h1>
              <p className="line-clamp-2">{data.description}</p>
              <span className="line-clamp-1 text-sm text-slate-700">
                {data.address}
              </span>
              <div className="mt-5 flex items-center justify-between">
                <p className="rounded-full bg-slate-200 px-4 py-[2px] capitalize">
                  {data.type}
                </p>
                <div>
                  <Button variant="link">Delete</Button>
                  <Link to={`/update-listing/${data._id}`}>
                    <Button variant="link">Update</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-28 w-28 basis-auto">
              <img
                src={data.imageUrls[0]}
                alt={data.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <Separator />
        </>
      ))}
    </div>
  );
};

export default Listings;