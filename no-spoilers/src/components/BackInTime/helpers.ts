export const extractDate = (url: string) => {
  const regex = /\/([0-9]{4})([0-9]{2})([0-9]{2})[0-9]+\//;
  const match = url.match(regex);
  const dateString = match?.slice(1).join('-');

  if (dateString) return new Date(dateString);

  return new Date(Date.now());
};
