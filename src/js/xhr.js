export default function xhr(method, url) {
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();

	xhr.onload = function() {
      resolve(JSON.parse(this.response));
    };

    xhr.onerror = reject;
    xhr.open(method, url);
    xhr.send(null);
  });
}
