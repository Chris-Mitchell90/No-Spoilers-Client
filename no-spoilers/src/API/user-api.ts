import { get, post, patch, setAuthHeader } from './api-client';

export const verifyTokenAndLogin = async (token: string) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await get(`/authcheck`, config);
  return response;
};

// export const setupToken = (token: string) => {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

export const loginUser = async (
  user: Omit<DBUser, 'avatar' | 'displayName'>
) => {
  const newUser = await post(`/login`, user);
  if (user.token) setAuthHeader(user.token);
  return newUser.data;
};

export const registerUser = async (user: DBUser) => {
  const newUser = await post(`/register`, user);
  if (user.token) setAuthHeader(user.token);
  return newUser.data;
};

export const addTVShow = async (_id: number, TMDB_show_Id: number) => {
  const newUserTVShow = await post(`/home/add/${TMDB_show_Id}`, {
    _id,
  });

  if (newUserTVShow.status === 400) return undefined;

  return newUserTVShow.data as UserTVShow;
};

export const updateUserAvatar = async (avatar: string) => {
  const response = await patch(`/profile/avatar`, {
    avatar,
  });

  if (response.status === 200) return response.data;
  return false;
};

const UserAPI = {
  login: loginUser,
  register: registerUser,
  updateAvatar: updateUserAvatar,
  addShow: addTVShow,
};
export default UserAPI;
