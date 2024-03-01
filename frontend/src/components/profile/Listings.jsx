/* eslint-disable react/prop-types */
import {
  UseDeleteMarketplace,
  UseGetMarketplaceByUserId,
} from "../../api/Marketplace";
import { useQuery, useMutation } from "react-query";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Link } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { useToast } from "../ui/use-toast";

const Listings = ({ userId }) => {
  const { toast } = useToast();

  const {
    data: dataListings,
    isLoading,
    isError,
    error,
  } = useQuery(["marketplace", userId], () =>
    UseGetMarketplaceByUserId(userId),
  );

  const {
    mutateAsync,
    isLoading: deleteListLoading,
    error: deleteListError,
  } = useMutation(UseDeleteMarketplace, {
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Delete list successful",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Delete list failed",
      });
    },
  });

  const handleDeleteList = async (listId) => {
    await mutateAsync(listId);
    console.log(deleteListError);
  };

  return (
    <div className="mx-auto w-[80%] space-y-10">
      {isError && (
        <p className="w-full rounded-md bg-rose-200 p-10 text-center">
          {error}
        </p>
      )}
      {isLoading ||
        (deleteListLoading && (
          <p className="w-full rounded-md bg-slate-200 p-10 text-center">
            Loading...
          </p>
        ))}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Want to delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete? you will not be able
                          to undo this changes
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteList(data._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
