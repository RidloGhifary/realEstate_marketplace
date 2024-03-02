import { UseGetMarketplaceById } from "../api/Marketplace";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/bundle";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { Button } from "../components/ui/button";
import Contact from "../components/Contact";
import { Skeleton } from "../components/ui/skeleton";

const Estate = () => {
  const location = useLocation();
  const dataId = location.pathname.split("/")[2];

  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = UseAppContext();

  const {
    data: estateDatas,
    isLoading,
    error,
  } = useQuery(["UseGetMarketplaceById", dataId], () =>
    UseGetMarketplaceById(dataId),
  );

  return (
    <main>
      {isLoading && (
        <div className="flex flex-col space-y-3 p-8">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      )}
      {error && (
        <p className="mx-auto mt-8 w-1/2 rounded-md bg-rose-500 p-6 text-white">
          Something wrong try again later.
        </p>
      )}
      {estateDatas && !isLoading && !error && (
        <div>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {estateDatas.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed right-[3%] top-[13%] z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-slate-100">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed right-[5%] top-[23%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="mx-auto my-7 flex max-w-4xl flex-col gap-4 p-3">
            <p className="text-2xl font-semibold">
              {estateDatas.name} - $
              {estateDatas.offer
                ? estateDatas.discountPrice.toLocaleString("en-US")
                : estateDatas.regularPrice.toLocaleString("en-US")}
              {estateDatas.type === "rent" && " / month"}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm  text-slate-600">
              <FaMapMarkerAlt className="text-green-700" />
              {estateDatas.address}
            </p>
            <div className="flex gap-4">
              <p className="w-full max-w-[200px] rounded-md bg-red-900 p-1 text-center text-white">
                {estateDatas.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {estateDatas.offer && (
                <p className="w-full max-w-[200px] rounded-md bg-green-900 p-1 text-center text-white">
                  ${+estateDatas.regularPrice - +estateDatas.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {estateDatas.description}
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm font-semibold text-green-900 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {estateDatas.bedrooms > 1
                  ? `${estateDatas.bedrooms} beds `
                  : `${estateDatas.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {estateDatas.bathrooms > 1
                  ? `${estateDatas.bathrooms} baths `
                  : `${estateDatas.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {estateDatas.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {estateDatas.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && estateDatas.userRef !== currentUser._id && (
              <Button
                onClick={() => setContact(!contact)}
                className="w-fit bg-slate-700  hover:opacity-95"
              >
                {contact ? "Close Contact" : "Contact landlord"}
              </Button>
            )}
            {contact && <Contact estateDatas={estateDatas} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Estate;
