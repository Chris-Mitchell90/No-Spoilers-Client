export const checkEmail = (email: string) => {
  const reg =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return reg.test(email);
};

export const checkPassword = (password: string) => {
  if (!password || password.length < 6) return false;

  return /^(?=.*[0-9])(?=.*[a-zA-Z]).+/.test(password);
};

export const getRandomString = (): string => {
  let randNum = Math.floor(Math.random() * 1000);
  const rando = Math.floor(Math.random() * 100) % 2 === 0;
  return (rando ? 'male/' : 'female/') + randNum + '.png';
};
