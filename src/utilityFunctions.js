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
  if(text.length < length) return text
  return text.slice(0, length) + "...";
}