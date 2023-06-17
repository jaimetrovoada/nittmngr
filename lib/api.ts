import { PostResponse, UserFeedsResponse } from "@/@types";

const url = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function createUser(username: string) {
  try {
    const res = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    const body = await res.json();
    const data: PostResponse = {
      ok: res.ok,
      status: res.status,
      error: body ? body.error : undefined,
    };

    return [data, null] as [PostResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function createUserFeed(username: string, feed: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feed,
      }),
    });

    const body = await res.json();
    const data: PostResponse = {
      ok: res.ok,
      status: res.status,
      error: body ? body.error : undefined,
    };

    return [data, null] as [PostResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function getUserFeeds(username: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}`);
    const data: UserFeedsResponse[] = await res.json();
    console.log({ data });
    return [data, null] as [UserFeedsResponse[], null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function getFeed(username: string, feed: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds/${feed}`);
    const data: UserFeedsResponse = await res.json();
    console.log({ data });
    return [data, null] as [UserFeedsResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function addFeedSubscription(
  username: string,
  feed: string,
  payload: {
    subs: string[];
    feedId: string;
  }
) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds/${feed}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    const data: PostResponse = {
      ok: res.ok,
      status: res.status,
      error: body ? body.error : undefined,
    };

    return [data, null] as [PostResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}
export async function removeFeedSubscription(
  username: string,
  feed: string,
  payload: {
    subs: string[];
    feedId: string;
  }
) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds/${feed}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    const data: PostResponse = {
      ok: res.ok,
      status: res.status,
      error: body ? body.error : undefined,
    };

    return [data, null] as [PostResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function deleteFeed(username: string, feedId: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds/${feedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();
    const data: PostResponse = {
      ok: res.ok,
      status: res.status,
      error: body ? body.error : undefined,
    };

    return [data, null] as [PostResponse, null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}
