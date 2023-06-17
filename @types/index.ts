export type UserResponse = {
  error: string;
} | null;

export type UserFeedsResponse = {
  id: string;
  title: string;
  subscriptions: string[];
  userId: string;
};
