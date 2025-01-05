// src/components/FeedItem.tsx
import React, { useEffect, useRef } from 'react';
import { FeedItemProps } from '../types/feed';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const FeedItem: React.FC<FeedItemProps> = ({ item, onLike, onUnlike, onView }) => {
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
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div ref={itemRef} className="feed-item">
      <div className="feed-item-content">
        <div className="feed-item-header">
          <img
            src={item.avatar}
            alt={item.username}
            className="avatar"
          />
          <div className="user-info">
            <h3 className="username">{item.username}</h3>
            {item.shopName && (
              <p className="shop-name">{item.shopName}</p>
            )}
          </div>
          {item.premium && (
            <span className="premium-badge">Premium</span>
          )}
        </div>

        {item.text && (
          <p className="feed-text">{item.text}</p>
        )}

        {item.images.length > 0 && (
          <div className={`image-grid ${item.images.length > 1 ? 'two-columns' : 'one-column'}`}>
            {item.images.slice(0, 2).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="post-image"
              />
            ))}
          </div>
        )}

        <div className="feed-item-footer">
          <div className="interaction-buttons">
            <button
              onClick={handleLikeClick}
              className={`like-button ${item.didLike ? 'liked' : ''}`}
            >
              <HeartIcon filled={item.didLike} />
              <span className="count">{item.likes}</span>
            </button>
            <div className="comment-section">
              <MessageIcon />
              <span className="count">{item.comments}</span>
            </div>
          </div>
          <span className="date">{formatDate(item.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;