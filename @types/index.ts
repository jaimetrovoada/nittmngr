export interface PostResponse {
  ok: boolean;
  status: number;
  error?: string;
}

export type UserFeedsResponse = {
  id: string;
  title: string;
  subscriptions: string[];
  userId: string;
};
