import { get, patch, destroy } from './api-client';

export const getShowDetail = async (id: string, userId: string) => {
  const newUserTVShow = await get(`/show/${id}`);

  return newUserTVShow.data as TVShow;
};

export const updateEpisode = async (
  _id: string,
  newEpisodeCode: string,
  TMDB_episode_id: string,
  TMDB_show_id: string
) => {
  // TODO fix this
  const updated = await patch(`/show/${TMDB_show_id}`, {
    newEpisodeCode,
    TMDB_episode_id,
  });

  if (updated.status === 500) return undefined;

  return updated.data as UserTVShow;
};

export const deleteUserShow = async (TMDB_show_id: string, userId: string) => {
  const response = await destroy(`/home/delete/${TMDB_show_id}`);

  if (response.status === 204) return true;
  return false;
};

export const setShowWatched = async (TMDB_show_id: string, userId: string) => {
  const response = await patch(`/home/complete/${TMDB_show_id}`);

  return response.data as UserTVShow;
};

const TVShowAPI = {
  single: getShowDetail,
  updateEpisode,
  delete: deleteUserShow,
  setWatched: setShowWatched,
};
export default TVShowAPI;
