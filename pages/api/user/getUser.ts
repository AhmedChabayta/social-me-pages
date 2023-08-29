import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "@src/lib/queries";
import { client } from "@src/sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query;
  const id = q.userID;

  if (typeof id === "string") {
    const query = singleUserQuery(id);
    const SingleUserQuery = await client.fetch(query);

    const userPosts = userCreatedPostsQuery(id);
    const UserPostsQuery = await client.fetch(userPosts);

    const userLikedPosts = userLikedPostsQuery(id);
    const UserLikedQuery = await client.fetch(userLikedPosts);

    return res
      .status(200)
      .json({ user: SingleUserQuery[0], UserPostsQuery, UserLikedQuery });
  }
}
