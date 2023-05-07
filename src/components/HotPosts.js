import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import InfiniteScroll from "react-infinite-scroll-component";
import { TfiComments } from "react-icons/tfi";
import { Link } from "react-router-dom";

const HotPosts = () => {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `https://www.reddit.com/r/all/hot.json?limit=10`
      );
      setPosts(response.data.data.children);
      setAfter(response.data.data.after);
    };
    fetchPosts();
  }, []);

  const fetchMoreData = async () => {
    const response = await axios.get(
      `https://www.reddit.com/r/all/hot.json?limit=10&after=${after}`
    );
    setPosts([...posts, ...response.data.data.children]);
    setAfter(response.data.data.after);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post) => (
        <div key={post.data.id} className="post-card">
          <ul className="card-header">
            <li className="likes">{post.data.ups.toLocaleString("en-US")} likes</li>

            <li>
              <Link
                to={`subreddit/${post.data.subreddit}`}
                className="subreddit-title"
              >
                {" "}
                r/{post.data.subreddit}{" "}
              </Link>
            </li>

            <li>
              {Math.round(
                (new Date() - post.data.created_utc * 1000) / 3600000
              )}{" "}
              hours ago
            </li>
          </ul>

          <Link to={`post/${post.data.id}`} className="post-title">
            <h2 className="post-title">{post.data.title}</h2>
            <p className='selftext'>{post.data.selftext}</p>
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
                <Link to={`post/${post.data.id}`}>
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
            <Link to={`post/${post.data.id}`} className="comments-container">
              <TfiComments className="comments-logo" />
              View Comments
            </Link>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default HotPosts;
