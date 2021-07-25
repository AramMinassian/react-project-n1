import { getToken } from "./utilityFunctions";


export default async function request(url, method = "GET", body) {
  const jwt = await getToken();
  if(!jwt){
    return Promise.reject(new Error("Failed to authorize"));
  }
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  }
  if (body) options.body = JSON.stringify(body);

  return fetch(url, options)
    .then(async (response) => {
      const result = await response.json();
      if (response.status >= 400 && response.status < 600) {
        if (result.error) {
          throw result.error;
        } else {
          throw new Error("Something went wrong");
        }
      }
      return result;
    })
}



export function requestWithoutToken(url, method = "GET", body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  }
  if (body) options.body = JSON.stringify(body);

  return fetch(url, options)
    .then(async (response) => {
      const result = await response.json();
      if (response.status >= 400 && response.status < 600) {
        if (result.error) {
          throw result.error;
        } else {
          throw new Error("Something went wrong");
        }
      }
      return result;
    })
}