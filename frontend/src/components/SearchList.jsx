/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const searchData = ({ searchData }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg sm:w-[300px]">
      <Link to={`/estate/${searchData?._id}`}>
        <img
          src={
            searchData?.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="searchData? cover"
          className="transition-scale h-[320px] w-full object-cover duration-300 hover:scale-105 sm:h-[220px]"
        />
        <div className="flex w-full flex-col gap-2 p-3">
          <p className="truncate text-lg font-semibold text-slate-700">
            {searchData?.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="w-full truncate text-sm text-gray-600">
              {searchData?.address}
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600">
            {searchData?.description}
          </p>
          <p className="mt-2 font-semibold text-slate-500 ">
            $
            {searchData?.offer
              ? searchData?.discountPrice.toLocaleString("en-US")
              : searchData?.regularPrice.toLocaleString("en-US")}
            {searchData?.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 text-slate-700">
            <div className="text-xs font-bold">
              {searchData?.bedrooms > 1
                ? `${searchData?.bedrooms} beds `
                : `${searchData?.bedrooms} bed `}
            </div>
            <div className="text-xs font-bold">
              {searchData?.bathrooms > 1
                ? `${searchData?.bathrooms} baths `
                : `${searchData?.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default searchData;
