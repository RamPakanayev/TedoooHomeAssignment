// src/types/feed.ts
export interface FeedItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  shopName: string;
  shopId: string;
  images: string[];
  comments: number;
  date: string;
  text: string;
  likes: number;
  didLike: boolean;
  premium: boolean;
}

export interface FeedResponse {
  hasMore: boolean;
  data: FeedItem[];
}

export interface FeedItemProps {
  item: FeedItem;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onView?: (id: string) => void;
}