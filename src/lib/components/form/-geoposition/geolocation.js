/* eslint-env browser */

function getPosition(options) {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      options,
    );
  });
}

export default getPosition;
