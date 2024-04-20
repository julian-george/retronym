import React from "react";

interface RetroTableProps {
  posts: string[];
}

const styles = {
  table: {
    width: "100%",
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
    <table style={styles.table}>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td style={styles.cell}>{post}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Feed: React.FC = () => {
  const posts = [
    "Post 1: This is a retro style post!",
    "Post 2: Here's another cool retro post!",
    "Post 3: Retro posts are back in style!",
    "Post 4: Don't miss out on this retro post!",
  ];

  return (
    <div>
      <h1
        style={{ fontFamily: '"Times New Roman", serif', textAlign: "center" }}
      >
        Retro Posts Table
      </h1>
      <RetroTable posts={posts} />
    </div>
  );
};

export default Feed;
