import { allPostsQuery } from "@src/lib/queries";
import { client } from "@src/sanity/lib/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const doc = req.body;
      console.log(doc);
      await client.createIfNotExists(doc, {
        token:
          "skDqNw7ikpdoMJYvB8Y98dqViR9iQRBVibp1ZqfkHMcK5JyjEd5t0Sfe0iRa3oUZcSqMosM9FDdX8bKnGnByyUhacQvrggbWd4mlAClo1ispFQN7oIQyMnJBLxT4XieArGKjneGcGCtOMe8MHUs681Y0p66QV7OD4vnhg6KgdkU3szKYX5C4",
      });
      return res.status(200).json("works");
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
