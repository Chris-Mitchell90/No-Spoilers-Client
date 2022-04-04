import { Dispatch, SetStateAction } from 'react';
import { SelectedOption } from 'react-select-search';
import { Socket } from 'socket.io-client';
import Episodechooser from './components/EpisodeChooser/Episodechooser';

/**
 * - UserTVShow[]
 * - goToTVShow
 */
export type ReelProps = {
  userTVShows: Array<UserTVShow>;
  isCompleted: boolean;
};

export type LoginProps = {
  setLoginOrRegister: Dispatch<SetStateAction<'login' | 'register'>>;
};

export type ForumProps = {
  showDetail: TVShow;
  userShow: UserTVShow;
};

export interface ForumNewTopicProps extends ForumProps {
  updateTopics: (topic: UserTopic) => void;
}

export type EpisodechooserProps = {
  seasons: Array<Season>;
};

export type NavbarProps = {
  showSearch?: boolean;
};

export interface TopicsProps extends ForumProps {
  topics: UserTopic[];
}
export interface TopicProps {
  topic: UserTopic;
  topicVisible?: boolean;
}

export type BackintimeProps = {
  show: TVShow;
  currentEpisode: string;
};

export type ReplyProps = {
  reply: Reply;
  userTVShow: UserTVShow;
};

export type ForumContextType = {
  topics: Array<UserTopic>;
  updateTopics: (topic: UserTopic) => void;
  setTopics: Dispatch<SetStateAction<UserTopic[]>>;
  addReply: (topic: UserTopic, reply: Reply) => void;
  updateTopic: (topic: UserTopic) => void;
  deleteTopic: (topic: UserTopic) => void;
  deleteReply: (replyToDelete: Reply) => void;
  updateReply: (reply: Reply, newBody: string) => void;
  updateTopicBody: (topic: UserTopic, newBody: string) => void;
};

export type CurrentShowContextType = {
  showDetail: TVShow;
  userTVShow: UserTVShow;
  setUserTVShow: Dispatch<SetStateAction<UserTVShow>>;
};

export type AvatarPropType = {
  setAvatar: Dispatch<SetStateAction<string>>;
};

export type ChatProps = {
  currentChat: Chat;
  toggleChat: () => void;
  showName: string;
  isChatOpen: boolean;
};
//
// export type ShowSidebarPropType = {
//   setSidebar: Dispatch<SetStateAction<boolean>>;
// };

export type ChatState = {
  isPaused: boolean;
  chatsCollection: Array<TVShowChats>;
  socket: Socket;
  sidebarOpen: boolean;
  currentShowChat: TVShowChats;
};

export type UserState = {
  isLoggedIn: boolean;
  user: User | {};
  currentUserTVShowDetail: TVShow;
};

export type MainState = {
  user: UserState;
  chat: ChatState;
};

export interface WithPhoto extends SelectedOption {
  name: string;
  poster_path?: string;
  first_air_date: string;
}
