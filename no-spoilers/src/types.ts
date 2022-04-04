/*

 Notes

 camelCase for data we have created or stored in our database

 under_scores for data fields we have received from external APIs.

 */

//////////////////////////////////////// HOMEPAGE
/** Basic User type
 *  - combines DBUser and UserTVShow from db.
 */

type User = {
  _id: number;
  email: string;
  displayName: string;
  avatar: string;
  userTVInfo: Array<UserTVShow>;
  token?: string;
};

type BasicUserInfo = Omit<User, 'userTVInfo'>;

/**
 * user creation / login
 */
type DBUser = {
  email: string;
  displayName: string;
  password: string;
  avatar: string;
  token?: string;
};

/**
 * Details about the users progress with the Show,
 * and presentational details for the Home page.
 * + userId refers to DBUser's _id
 */

type UserTVShow = {
  userId: string;
  TMDB_show_id: number;
  name: string;
  poster_path: string;
  current_poster_path?: string | null;
  isCompleted: boolean;
  episodeIdUpTo: number;
  episodeCodeUpTo: string;
  episodeCodeNext: string;
  episodesWatchedSoFar: number;
  percentComplete?: number;
};

/////////////////////// ADD SHOW

type TVShowSnippet = {
  name: string;
  TMDB_show_id: number;
  poster_path?: string;
  first_air_date: string;
};

/**
 * Details for the Add Show and TV Show pages
 */

type Season = {
  TMDB_season_id: number;
  numberOfEpisodes?: number;
  episodes: Episode[];
  poster_path: string;
};

type Episode = {
  name: string;
  TMDB_episode_id: number;
  season_number: number;
  episode_number: number;
};

interface EpisodefromAPI extends Episode {
  id: number;
  air_date?: string;
}

type TVShow = {
  TMDB_show_id: number;
  name: string;
  first_air_date: string;
  last_air_date: string;
  homepage: string;
  tagline: string;
  backdrop_path: string;
  poster_path: string;
  created_by: string;
  next_episode_to_air: string;
  number_of_episodes: number;
  number_of_seasons: number;
  percentComplete: number;
  seasons: Array<Season>;
  overview: string;
};

// interface ExternalIds {
//   imdb_id?: string;
//   facebook_id?: string;
//   instagram_id?: string;
//   twitter_id?: string;
//   wikipediaId?: string;
//   homepage?: string;
// }
interface ExternalIds {
  [key: string]: number | string;
}

/**
 * Forum Stuff
 */

type Topic = {
  _id?: number;
  TMDB_show_id: number;
  TMDB_episode_id: number;
  authorUserId: string;
  authorName: string;
  episodeCode: string;
  title: string;
  body: string;
  numberOfReplies: number;
  avatar: string;
  date: Date;
  voteScore: number;
  upVoteIds: string[];
  downVoteIds: string[];
  replies: Reply[];
  isReported: boolean;
};

interface UserTopic extends Topic {
  userVote: number;
}

interface TopicRequest {
  title: string;
  body: string;
  _id: string;
}

type Reply = {
  _id: number;
  topicId: number;
  authorUserId: number;
  authorName: string;
  replierEpisodeUpTo: number;
  body: string;
  date: Date;
  avatar: string;
  isReported: boolean;
};

type Report = {
  reporterId: string;
  offendingUserId: string;
  offenceType: string;
  type: 'Topic' | 'Reply';
  topicId: string;
  replyId: string;
  date?: Date;
};

interface UserTVShowUpdate extends UserTVShow {
  percentComplete: number;
}

type UserWayback = {
  name: string;
  waybackUrl: string;
};

type ChatRequest = {
  socket_id?: string;
  userId: string;
  show_Id: number;
  episodeId: number;
  displayName: string;
  avatar: string;
};

// Other people
type Chatter = {
  socketId: string;
  avatar: string;
  displayName: string;
  userId: string;
  showId: string;
};

type Message = {
  receiverId: string;
  displayName: string;
  avatar: string;
  senderId: string;
  message: string;
  showId: string;
  showName: string;
  date: Date;
};

type TVShowChats = {
  showId: string;
  showName: string;
  chats: Array<Chat>;
};

type Chat = {
  chatterId: string;
  displayName: string;
  avatar: string;
  showId: string;
  messages: Array<Message>;
};

type CurrentShowChats = {
  name: string;
  chatters: Array<Chat>;
};

/* 
waiting = Array<ChatRequest>
*/

/* 

emit('request', ChatRequest)

on('subscribed', Array<ChatResponse>) => Add to sidebar in own little box.

on('found', ChatResponse) => Add to ChatResponses


*/
