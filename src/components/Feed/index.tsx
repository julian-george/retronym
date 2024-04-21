import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import BASE_API_URL from "../../url";
import { shuffle } from "lodash";
import RedditPost from "./RedditPost";

interface RetroTableProps {
  posts: any[];
}

const API_URL = BASE_API_URL + "/posts";

const styles = {
  table: {
    backgroundColor: "#f0f0f0",
    border: "3px solid #000000",
    fontFamily: '"Times New Roman", serif',
  },
  cell: {
    border: "2px solid #000000",
    padding: "8px",
    color: "#000000",
    fontSize: "16px",
  },
};

const RetroTable: React.FC<RetroTableProps> = ({ posts }) => {
  return (
    <table className="w-full">
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td style={styles.cell}>
              <RedditPost title={post.data.title} text={post.data.text} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const getPosts = useCallback(async () => {
    const result = (await axios.get(API_URL + "/")) as any;
    setPosts(result.data.posts.redditPosts.data.children);
  }, []);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <RetroTable posts={shuffle(posts)} />
    </div>
  );
};

export default Feed;
