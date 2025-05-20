const truncateWord = (str) => {
  return str.length > 40
    ? str.slice(0, 40).concat('...')
    : str;
};

export default truncateWord;
