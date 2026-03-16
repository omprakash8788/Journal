const API = import.meta.env.VITE_API_URL;
const signin = async (user) => {
  try {
    let response = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "Server connection failed" }; // IMPORTANT
  }
};

const signout = async () => {
  try {
    let response = await fetch(`${API}/auth/signout/`, { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
