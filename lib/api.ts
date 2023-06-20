import { PostResponse, UserFeedsResponse } from "@/@types";

const url =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_APP_URL
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

export async function createUserFeed(
  username: string,
  payload: {
    feed: string;
    isNsfw: boolean;
  }
) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds`, {
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

export async function getUserFeeds(username: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}`, {
      next: { revalidate: 10 },
    });
    const data: UserFeedsResponse[] = await res.json();
    if (!res.ok) {
      return [null, null] as [null, null];
    }
    return [data, null] as [UserFeedsResponse[], null];
  } catch (error) {
    console.log({ error });
    return [null, error] as [null, Error];
  }
}

export async function getFeed(username: string, feed: string) {
  try {
    const res = await fetch(`${url}/api/users/${username}/feeds/${feed}`, {
      next: { revalidate: 10 },
    });
    const data: UserFeedsResponse = await res.json();
    console.log({ data, res: res.ok });
    if (!res.ok) {
      return [null, null] as [null, null];
    }
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
