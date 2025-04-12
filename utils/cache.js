export const createCache = (ttl = 5 * 60 * 1000) => {
  // 5 minutes default TTL
  const cache = {};

  return {
    get: (key) => {
      const item = cache[key];
      if (!item) return null;

      // Check if the cached item has expired
      if (item.expiry < Date.now()) {
        delete cache[key];
        return null;
      }

      return item.value;
    },

    set: (key, value) => {
      cache[key] = {
        value,
        expiry: Date.now() + ttl,
      };
    },

    invalidate: (key) => {
      delete cache[key];
    },

    clear: () => {
      Object.keys(cache).forEach((key) => delete cache[key]);
    },
  };
};

export const dataCache = createCache();
