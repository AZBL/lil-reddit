import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({}); //should this be an array?
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // add a loading state

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `https://www.reddit.com/comments/${postId}.json`
        );
        setPost(res.data[0].data.children[0].data);
        setComments(res.data[1].data.children);
      } finally {
        setLoading(false); // set loading to false after the post is loaded
      }
    };
    getPost();
  }, [postId]); //should it be postId or an empty array???

  if (loading) {
    return <div className="loading">Loading...</div>; // display loading message
  }

  return (
    <div className="path">
      <div className="post-card ">
        <ul className="card-header post-header">
          <li className="post-list likes">{post.ups} likes</li>
          <li className="post-link">
            <Link
              to={`/subreddit/${post.subreddit}`}
              className="subreddit-title post-list"
            >
              {" "}
              r/{post.subreddit}{" "}
            </Link>
          </li>

          <li className="post-list">
            {Math.round((new Date() - post.created_utc * 1000) / 3600000)} hours
            ago
          </li>
        </ul>

        <h2 className="post-title">{post.title}</h2>
        <p className="selftext">{post.selftext}</p>

        <Link className="media-container">
          {post.is_video ? (
            <ReactPlayer
              className="media"
              url={
                post.media.reddit_video.hls_url ||
                post.media.reddit_video.dash_url ||
                post.media.reddit_video.fallback_url
              }
              controls={true}
              width="100%"
              height="auto"
            />
          ) : (
            post.url_overridden_by_dest && (
              <Link to={`/post/${post.id}`}>
                {/* Get rid of this link???? */}
                <img
                  className="media"
                  src={post.url_overridden_by_dest}
                  alt=""
                />
              </Link>
            )
          )}
        </Link>
        <div className="card-footer post-card-footer"></div>
      </div>
      {/* comments */}
      <div className="comments-contain">
        <h2 className="comments-title">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.data.id} className="comments">
            <div className="comment-card">
              <h3 className="comment-author">{comment.data.author}</h3>
              <p className="comment-body">{comment.data.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
