import { useEffect, useState } from "react";
import { useUserStore } from "@src/store/useUserStore";
import Image from "next/image";
import {
  SingleUserProfileAndCreatedAndLiked,
  UserCreatedPosts,
} from "@src/types";
import moment from "moment";
import { UserLikedQuery, UserPostsQuery } from "@src/types/types";
import { fetchUserProfile } from "./functions";

const ProfileQuickView = () => {
  const [profile, setProfile] = useState<SingleUserProfileAndCreatedAndLiked>();

  const [createdOrLiked, setCreatedOrLiked] = useState<
    (UserPostsQuery | UserLikedQuery) | undefined
  >();

  const { userID } = useUserStore();

  useEffect(() => {
    fetchUserProfile(setProfile, userID);
  }, [userID]);

  useEffect(() => {
    if (profile && userID) {
      setCreatedOrLiked(profile?.UserPostsQuery);
    }
  }, [profile, setCreatedOrLiked, userID]);

  const createdAt = moment(profile?.user._createdAt);

  const formattedDate = createdAt.format("MMMM Do YYYY");
  if (!profile) return;
  return (
    <div className="hidden min-h-[89%] w-full max-w-[20vw] flex-col items-start justify-start rounded border border-gray-400/50 bg-gray-200 p-3 xl:flex">
      <div className="mx-auto w-full">
        <Image
          className="mx-auto w-[300px] object-contain"
          height={400}
          width={400}
          src={profile?.user?.image.asset.url}
          alt=""
        />
      </div>
      <div>
        <h2 className="capitalize">{profile.user.userName}</h2>
        <h2 className="text-xs capitalize text-gray-500">
          member since {formattedDate}
        </h2>
      </div>
      <div className="flex w-full items-center justify-center space-x-2">
        <button
          className="mt-5 rounded border border-gray-400/50 px-2 py-1 text-sm"
          onClick={() => setCreatedOrLiked(profile.UserPostsQuery)}
        >
          Posted
        </button>
        <button
          className="mt-5 rounded border border-gray-400/50 px-2 py-1 text-sm"
          onClick={() => setCreatedOrLiked(profile.UserLikedQuery)}
        >
          Liked
        </button>
      </div>
      <div className="mt-10 grid w-full grid-cols-3 gap-x-1">
        {createdOrLiked?.map((item) =>
          item.images.map((item) => (
            <Image
              className="w-20 object-contain"
              key={item.asset._id}
              height={50}
              width={50}
              src={item.asset.url}
              alt=""
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ProfileQuickView;
