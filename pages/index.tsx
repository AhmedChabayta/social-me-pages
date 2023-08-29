import { NoResults, PostCard } from "@src/components";
import { BASE_URL } from "@src/sanity/env";

import { Post } from "@src/types";

interface IProps {
  allPosts: Post[];
}

const Home = (props: IProps) => {
  const { allPosts } = props;
  return (
    <div className="mx-auto flex w-full flex-col gap-10 p-3 scrollbar-hide">
      {allPosts.length > 1 ? (
        allPosts.map((post) => <PostCard key={post?._id} post={post} />)
      ) : (
        <NoResults text="No Results Found" />
      )}
    </div>
  );
};
export default Home;

export const getServerSideProps = async () => {
  const fetchPosts = await fetch(`${BASE_URL}/api/posts/getAllPosts`);
  if (!fetchPosts.ok) {
    throw new Error(`Failed to fetch posts. Status: ${fetchPosts.status}`);
  }

  const allPosts: Post[] = await fetchPosts.json();
  return {
    props: {
      allPosts,
    },
  };
};
