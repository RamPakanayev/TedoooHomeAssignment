// src/components/FeedItem.tsx
import React, { useEffect, useRef } from "react";
import { FeedItemProps } from "../types/feed";
import "../styles/FeedItem.css";
import likeIcon from "../assets/like.svg";
import greenLikeIcon from "../assets/green-like.svg";
import commentIcon from "../assets/comment.svg";

const FeedItem: React.FC<FeedItemProps> = ({
  item,
  onLike,
  onUnlike,
  onView,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onView(item.id);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (itemRef.current) {
      observerRef.current.observe(itemRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [item.id, onView]);

  const handleLikeClick = () => {
    if (item.didLike) {
      onUnlike(item.id);
    } else {
      onLike(item.id);
    }
  };

  const formatDate = (dateString: string) => {
    return "1h"; // This can be enhanced with actual date formatting
  };

  return (
    <div ref={itemRef} className="post">
      <div className="post-header">
        <div className="user-info">
          <img src={item.avatar} alt={item.username} className="user-avatar" />
          <div className="user-details">
            <div className="user-name-container">
              <span className="user-name">{item.username}</span>
            </div>
            <span className="post-time">
              {item.shopName && (
                <span className="shop-name">{item.shopName + " · "}</span>
              )}
              
              {formatDate(item.date)}
            </span>
          </div>
        </div>
      </div>

      {item.text && <p className="post-text">{item.text}</p>}

      <div className="post-media">
        {item.images.length > 0 && (
          <div
            className={`post-images ${
              item.images.length > 1 ? "grid-two" : ""
            }`}
          >
            {item.images.slice(0, 2).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post content ${index + 1}`}
                className="post-image"
              />
            ))}
          </div>
        )}
      </div>

      <div className="post-stats">
        <div className="stats-item">
          <img src={greenLikeIcon} alt="Like" className="stats-icon" />
          <span>{item.likes} Likes</span>
        </div>
        <div className="stats-item">
          <span>{item.comments} Comments</span>
        </div>
      </div>

      <div className="post-actions">
        <button
          className={`action-button ${item.didLike ? "liked" : ""}`}
          onClick={handleLikeClick}
        >
          <img
            src={item.didLike ? greenLikeIcon : likeIcon}
            alt="Like"
            className="action-icon"
          />
          <span>Like</span>
        </button>
        <button className="action-button">
          <img src={commentIcon} alt="Comment" className="action-icon" />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
