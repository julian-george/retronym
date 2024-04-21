const RedditPost: React.FC<{ title: string; text: string }> = ({
  title,
  text,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default RedditPost;
