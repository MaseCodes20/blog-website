import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, USERS_ROUTE } from "../../../api/config";
import SuggestedBlogs from "./SuggestedBlogs";

function SuggestBlogsSection() {
  const { user } = useSelector((state) => state.auth);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSuggestedBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}${USERS_ROUTE}`, {
          signal,
        });

        const suggestBlogs = response.data
          ?.filter((selectedUser) => selectedUser._id !== user?._id)
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
          .slice(0, 4);

        setSuggestedBlogs(suggestBlogs);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch Suggested Blogs cancelled!");
        } else {
          console.log(error.message);
        }
      }
    };

    fetchSuggestedBlogs();

    return () => {
      controller.abort();
    };
  }, [user?._id]);

  return (
    <div className="w-full min-h-[338px] p-3 mb-5">
      <h2 className="font-semibold text-[20px]  mb-3">Check out these blogs</h2>

      {/* Profile Cards */}
      <SuggestedBlogs suggestedUsers={suggestedBlogs} />
    </div>
  );
}

export default SuggestBlogsSection;
