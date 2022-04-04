export const getBackground = (tabNumber: number, selectedTab: number) => {
  if (tabNumber === selectedTab) {
    return {
      backgroundColor: '#d4d4d8',
    };
  }

  return {
    backgroundColor: '#9ca3af',
  };
};

export const constructEpCode = (
  season: number,
  episode: number,
  next: string
) => {
  const str = 's' + season + 'e' + episode;
  return str;
};
