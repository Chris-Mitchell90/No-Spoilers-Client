export const calculatePercentComplete = (
  userShow: UserTVShow,
  details: TVShow
) => {
  if (details.seasons) {
    const totalWatched = userShow.episodesWatchedSoFar;
    const numberOfEpisodesTotal = details.seasons.reduce(
      (total, season) => (season.numberOfEpisodes as number) + total,
      0
    );
    return Math.floor((totalWatched / numberOfEpisodesTotal) * 100);
  }
  return 0;
};
