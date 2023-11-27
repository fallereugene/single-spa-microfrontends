export const domParser = (domString: string) => {
  return new DOMParser().parseFromString(domString, "text/html");
};
