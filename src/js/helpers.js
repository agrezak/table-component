export function qs(element) {
  return document.querySelector(element);
}

export function qsa(elements) {
  return Array.from(document.querySelectorAll(elements));
}

export function on(element, type, callback) {
  let arr = element.constructor === Array;

  if(arr) {
    element.forEach(i => {
      i.addEventListener(type, callback);
    });
    return;
  }

  element.addEventListener(type, callback);
}
