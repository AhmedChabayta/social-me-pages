import { allPostsQuery } from "@src/lib/queries";
import { client } from "@src/sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const query = allPostsQuery();
      const data = await client.fetch(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
