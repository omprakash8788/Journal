const API = import.meta.env.VITE_API_URL;

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${API}/api/posts/feed/` + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials) => {
  try {
    let response = await fetch(`${API}/api/posts/by/` + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const create = async (params, credentials, post) => {
  try {
    let response = await fetch(`${API}/api/posts/new/` + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: post,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listNewsFeed, listByUser, create };
