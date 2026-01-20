export const retry = (fn, { interval = 1000, retries = 6 } = {}) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (!retries) {
            reject(error);
            return;
          }

          retry(fn, {
            interval: interval * 1.5,
            retries: retries - 1,
          }).then(resolve, reject);
        }, interval);
      });
  });
};
