export const deepClone = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const formatTimestampToReadableDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};
