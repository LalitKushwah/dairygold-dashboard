export const deepClone = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};
