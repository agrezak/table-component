export function qs(element, searchIn) {
  searchIn = document || searchIn;
  return searchIn.querySelector(element);
}

export function qsa(elements, searchIn) {
  searchIn = document || searchIn;
  return Array.from(searchIn.querySelectorAll(elements));
}

export function on(element, type, callback) {
  const arr = element.constructor === Array;

  if(arr) {
    element.forEach(i => {
      i.addEventListener(type, callback);
    });
    return;
  }

  element.addEventListener(type, callback);
}
