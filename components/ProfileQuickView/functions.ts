import { SingleUserProfileAndCreatedAndLiked } from "@src/types";
import { Dispatch, SetStateAction } from "react";

export const fetchUserProfile = async (
  setProfile: Dispatch<
    SetStateAction<SingleUserProfileAndCreatedAndLiked | undefined>
  >,
  userID?: string
) => {
  if (userID) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/getUser?userID=${userID}`
      );

      if (response.ok) {
        const responseData: SingleUserProfileAndCreatedAndLiked =
          await response.json();
        console.log(responseData, "RESPONSE");

        setProfile(responseData); // Update the profile state with fetched data
      } else {
        console.error(
          "Failed to fetch user profile:",
          response.status,
          response.statusText
        );
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error, e.g., show an error message to the user
    }
  }
};
