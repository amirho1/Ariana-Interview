export function preventDefault(e) {
  e.preventDefault();
}

export function lastIndexId(list) {
  return list.length === 0 ? 1 : list[list.length - 1].id;
}

export function calcAge(timestamp) {
  var ageDifMs = Date.now() - new Date(timestamp).getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function saveOnLocalStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
