import { get, post } from './api-client';

export const getWaybackUrls = async (userId: number, TMDB_show_Id: number) => {
  const waybacks = await get(`/wayback/${TMDB_show_Id}`);
  return waybacks.data as ExternalIds;
};

export const getUserWaybackUrls = async (_id: number, TMDB_show_Id: number) => {
  const waybacks = await get(`/userwayback/${TMDB_show_Id}`);

  return waybacks.data.websites as Array<UserWayback>;
};

export const addUserWaybackUrl = async (
  _id: number,
  website: string,
  TMDB_show_Id: number
) => {
  const waybacks = await post(`/userwayback/add/${TMDB_show_Id}`, {
    website,
  });

  return waybacks.data as UserWayback;
};

export const updateUserWayback = async (_id: number, TMDB_show_Id: number) => {
  try {
    const waybacks = await get(`/userwayback/update/${TMDB_show_Id}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const WaybackAPI = {
  getUrls: getWaybackUrls,
  getUserUrls: getUserWaybackUrls,
  addUrl: addUserWaybackUrl,
  updateUserWayback,
};

export default WaybackAPI;
