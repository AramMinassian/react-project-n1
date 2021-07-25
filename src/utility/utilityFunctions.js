import decode from "jwt-decode";
import requestWithoutToken from "./requestWithoutToken";
import store from "../reduxStore/store";
import history from "./history";

const apiHost = process.env.REACT_APP_API_HOST;

export function idGenerator() {
  return Math.random().toString(32).slice(2) + "-" + Math.random().toString(32).slice(2);
}

export function dateFormatter(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

export function dateDispalyFormatter(date = "yyyy-mm-dd") {
  return date.slice(0, 10).split("-").reverse().join(".")
}

export function truncText(text = "", length = 10) {
  if (text.length < length) return text
  return text.slice(0, length) + "...";
}

export function autoSignOut(jwt) {
  store.dispatch({ type: "PROCESS" });
  if (!jwt) {
    store.dispatch({ type: "SIGNOUT" });
    history.push("/signin"); 
    return;
  }
  requestWithoutToken(`${apiHost}/user/sign-out`, "POST", { jwt })
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      store.dispatch({ type: "SIGNOUT" });
      history.push("/signin");
    })
    .catch(error => {
      store.dispatch({ type: "ERROR", errorMessage: error.message })
    });
}

export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    autoSignOut()
    return;
  }
  const jwt = token.jwt;
  const jwtObject = decode(jwt);

  if (jwtObject.exp - new Date().getTime() / 1000 > 60) {
    return Promise.resolve(jwt);
  }
  //if the token is out of date

  return requestWithoutToken(`${apiHost}/user/${jwtObject.userId}/token`, "PUT", {
    refreshToken: token.refreshToken
  })
    .then(token => {
      localStorage.setItem("token", JSON.stringify(token));
      return token.jwt;
    })
    .catch(() => {
      
      autoSignOut(jwt);
      console.clear();
    })
}

