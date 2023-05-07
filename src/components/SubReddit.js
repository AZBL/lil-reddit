import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { TfiComments } from "react-icons/tfi";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export default function SubReddit() {
  const { subredditId } = useParams();
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://www.reddit.com/r/${subredditId}/.json?limit=10`
      );
      setPosts(res.data.data.children);
      setAfter(res.data.data.after);
    };
    fetchPosts();
  }, [subredditId]);

  const fetchMorePosts = async () => {
    const response = await axios.get(
      `https://www.reddit.com/r/${subredditId}/.json?limit=10&after=${after}`
    );
    setPosts([...posts, ...response.data.data.children]);
    setAfter(response.data.data.after);
  };

  return (
    <div className="path">
      {/* <h2 className="subPageTitle">r/{id} </h2> */}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        // endMessage={<p>No more posts to load.</p>}
      >
        {posts.map((post) => (
          <div key={post.data.id} className="post-card">
            <ul className="card-header subCardHeader">
              <li className="sub-list likes">
                {post.data.ups.toLocaleString("en-US")} likes
              </li>

              <li className="sub-list">
                <Link
                  to={`/subreddit/${post.data.subreddit}`} //Should I get rid of this link????
                  className="subreddit-title path-subreddit-title"
                >
                  r/{post.data.subreddit}
                </Link>
              </li>

              <li className="sub-list">
                {Math.round(
                  (new Date() - post.data.created_utc * 1000) / 3600000
                )}{" "}
                hours ago
              </li>
            </ul>

            <Link to={`/post/${post.data.id}`} className="post-title">
              <h2 className="post-title">{post.data.title}</h2>
              <p className="selftext">{post.data.selftext}</p>
            </Link>

            <div className="media-container">
              {post.data.is_video ? (
                <ReactPlayer
                  className="media"
                  url={
                    post.data.media.reddit_video.hls_url ||
                    post.data.media.reddit_video.dash_url ||
                    post.data.media.reddit_video.fallback_url
                  }
                  controls={true}
                  width="100%"
                  height="auto"
                />
              ) : (
                post.data.url_overridden_by_dest && (
                  <Link to={`/post/${post.data.id}`}>
                    <img
                      className="media"
                      src={post.data.url_overridden_by_dest}
                      alt=""
                    />
                  </Link>
                )
              )}
            </div>
            <div className="card-footer">
              <Link to={`/post/${post.data.id}`} className="comments-container">
                <TfiComments className="comments-logo" />
                View Comments
              </Link>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
