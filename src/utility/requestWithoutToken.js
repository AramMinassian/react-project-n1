
export default function requestWithoutToken(url, method = "GET", body) {
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