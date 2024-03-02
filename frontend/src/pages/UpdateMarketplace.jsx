// import Checkboxes from "../components/create-marketplace/Checkboxes";
// import MainInput from "../components/create-marketplace/MainInput";
// import Prices from "../components/create-marketplace/Prices";
// import Rooms from "../components/create-marketplace/Rooms";
// import UploadImages from "../components/create-marketplace/UploadImages";
// import { Button } from "../components/ui/button";
// import { useLocation } from "react-router-dom";
// import { useQuery } from "react-query";
// import { UseGetMarketplaceById } from "../api/Marketplace";

// const UpdateMarketplace = () => {
//   const location = useLocation();
//   const dataId = location.pathname.split("/")[2];

//   const { data: estateDatas, isLoading } = useQuery(
//     ["UseGetMarketplaceById", dataId],
//     () => UseGetMarketplaceById(dataId),
//   );

//   return (
//     <main className="mx-auto mb-20 max-w-4xl p-3">
//       {isLoading && <p>Loading...</p>}
//       <h1 className="my-7 text-center text-3xl font-semibold">
//         Create a Listing
//       </h1>
//       {/* {isError && (
//         <p className="text-center text-rose-500">something went wrong</p>
//       )} */}
//       <form className="grid gap-3 md:grid-cols-2">
//         <div className="flex flex-1 flex-col gap-4">
//           {/* NAME, DESCRIPTION AND ADDRESS INPUTS HERE */}
//           <MainInput estateDatas={estateDatas} />
//           {/* CHECKBOXES HERE */}
//           {/* <Checkboxes estateDatas={estateDatas} /> */}
//           <div className="grid grid-cols-2 gap-3">
//             {/* ROOMS INPUT HERE */}
//             {/* <Rooms estateDatas={estateDatas} /> */}
//             {/* PRICES INPUT HERE */}
//             {/* <Prices estateDatas={estateDatas} /> */}
//           </div>
//         </div>
//         {/* UPLOAD IMAGES INPUT HERE */}
//         {/* <UploadImages /> */}
//         <Button>Update</Button>
//       </form>
//     </main>
//   );
// };

// export default UpdateMarketplace;

const UpdateMarketplace = () => {
  return <div>UpdateMarketplace</div>;
};

export default UpdateMarketplace;
