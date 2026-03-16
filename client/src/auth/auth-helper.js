import { signout } from "./api-auth";

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    const jwt = sessionStorage.getItem("jwt");
    if (!jwt || jwt === "undefined") return false;

    try {
      return JSON.parse(jwt);
    } catch (error) {
        console.log(error)
      return false;
    }
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();

    // optional
    signout().then(() => {
      document.cookie =
        "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
