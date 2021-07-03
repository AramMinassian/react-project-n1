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

export function request(url, method = "GET", body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
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