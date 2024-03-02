/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GetCurrentUser } from "../api/Users";
import { Textarea } from "./ui/textarea";

export default function Contact({ estateDatas }) {
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const { data: landlord, isLoading } = useQuery(
    ["GetCurrentUser", estateDatas.userRef],
    GetCurrentUser(estateDatas.userRef),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {estateDatas.name.toLowerCase()}
            </span>
          </p>
          <Textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full rounded-lg border p-3"
          />

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${estateDatas.name}&body=${message}`}
            className="rounded-lg bg-slate-700 p-3 text-center uppercase text-white hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
