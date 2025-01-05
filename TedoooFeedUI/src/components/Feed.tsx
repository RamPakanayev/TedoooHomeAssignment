// src/components/Feed.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FeedItem, FeedResponse } from '../types/feed';
import FeedItemComponent from './FeedItem';

const Feed: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const viewedItems = useRef<Set<string>>(new Set());

  const loadFeedItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/hw/feed.json${skip ? `?skip=${skip}` : ''}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: FeedResponse = await response.json();
      
      setItems(prevItems => [...prevItems, ...data.data]);
      setHasMore(data.hasMore);
      setSkip(prev => prev + 6);
    } catch (error) {
      console.error('Error loading feed items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, didLike: true, likes: item.likes + 1 }
          : item
      )
    );
  };

  const handleUnlike = async (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, didLike: false, likes: item.likes - 1 }
          : item
      )
    );
  };

  const handleView = async (id: string) => {
    if (!viewedItems.current.has(id)) {
      try {
        await fetch(`/api/?itemId=${id}`);
        viewedItems.current.add(id);
      } catch (error) {
        console.error('Error sending impression:', error);
      }
    }
  };

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadFeedItems();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    loadFeedItems();
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="feed-container">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastElementRef : undefined}
          className="feed-item-wrapper"
        >
          <FeedItemComponent
            item={item}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onView={handleView}
          />
        </div>
      ))}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default Feed;