const info = (...args: unknown[]) => {
  console.log(...args);
};

const error = (...args: unknown[]) => {
  console.error(...args);
};

export default {
  info,
  error,
};
