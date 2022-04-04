import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Episodechooser from '../EpisodeChooser/Episodechooser';
import Forum from '../Forum/Forum';
import Backintime from '../BackInTime/Backintime';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import StyledShow, { boxStyle, coverStyle, spinnerStyle } from './show.styled';
// mui library below
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';

import { TailSpin } from 'react-loader-spinner';
import { CurrentShowContext } from '../../App';
import { Socket } from 'socket.io-client';
import { bindActionCreators } from 'redux';
import {
  ChatActionCreators,
  UserActionCreators,
} from '../../state/action-creators';
import { MainState, ChatState } from '../../proptypes';
import Sidebar from '../Sidebar/Sidebar';
import TVShowAPI from '../../API/TVShow-api';
import { calculatePercentComplete } from './helpers';

function Show() {
  const { id } = useParams();
  const [show, setShow] = useState<TVShow>({} as TVShow);
  const [userTVShow, setUserTVShow] = useState<UserTVShow>({} as UserTVShow);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosterPath, setCurrentPosterPath] = useState<string>('');
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({} as Episode);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  const socket = useSelector<MainState>((state) => state.chat.socket) as Socket;
  const chat = useSelector<MainState>((state) => state.chat) as ChatState;
  const [chatRequested, setChatRequested] = useState<boolean>(
    chat.chatsCollection.findIndex((coll) => coll.showId === id) !== -1 || false
  );

  const user = useSelector<MainState>((state) => state.user.user) as User;
  const dispatch = useDispatch();

  const { changeCurrentUserTVDetailAction } = bindActionCreators(
    UserActionCreators,
    dispatch
  );

  useEffect(() => {
    setIsLoading(true);
    const getShow = async () => {
      if (id && user) {
        const userShow = user.userTVInfo.find(
          (show) => show.TMDB_show_id === parseInt(id)
        ) as UserTVShow;

        const detail = await TVShowAPI.single(id, userShow.userId);

        if (userShow) setUserTVShow(userShow);
        setShow(detail);
        changeCurrentUserTVDetailAction(detail);
        setIsLoading(false);

        setCurrentPosterPath(
          userShow.current_poster_path || userShow.poster_path
        );
      } else {
        console.error('in Show, id param or user is undefined');
      }
    };
    getShow();
  }, []);

  useEffect(() => {
    if (show.seasons && userTVShow.episodeCodeUpTo) {
      setCurrentEpisode(getEpisodeFromEpisodeCode(userTVShow.episodeCodeUpTo));
      if (show && userTVShow)
        setPercentComplete(calculatePercentComplete(userTVShow, show));
    }
  }, [show, userTVShow]);

  const requestChat = () => {
    if (socket.connected && !chatRequested) {
      socket.emit('request', {
        userId: user._id,
        showId: show.TMDB_show_id,
        episodeId: currentEpisode.TMDB_episode_id,
        displayName: user.displayName,
        avatar: user.avatar,
      });
      setChatRequested(true);
    }
  };

  useEffect(() => {
    if (userTVShow) {
      setCurrentPosterPath(
        userTVShow.current_poster_path || userTVShow.poster_path
      );
    }
    if (show && userTVShow)
      setPercentComplete(calculatePercentComplete(userTVShow, show));
  }, [userTVShow]);

  const getEpisodeFromEpisodeCode = (episodeCode: string): Episode => {
    const [seasonIndex, episodeIndex] = episodeCode
      .slice(1)
      .split('e')
      .map((n) => parseInt(n));
    return show.seasons[seasonIndex - 1].episodes[episodeIndex - 1];
  };

  //////// RENDER

  const renderSpinner = () => {
    if (isLoading)
      return (
        <div style={coverStyle}>
          <div style={spinnerStyle}>
            <TailSpin color="#00BFFF" height={200} width={200} />
          </div>
        </div>
      );
  };

  const renderDetailsModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            {show.tagline && <>&quot;{show.tagline}&quot;</>}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              <span style={{ fontWeight: 800 }}> Description:</span>{' '}
              {show.overview}
            </p>
            <p>
              Release year:{' '}
              <span>{new Date(show.first_air_date).getFullYear()}</span>
            </p>
          </Typography>
        </Box>
      </Modal>
    );
  };

  const renderShowDetails = () => {
    return (
      <div className="show-description">
        <h1>{show.name}</h1>
        <br></br>
        {currentEpisode.name && (
          <div className="progress">
            <h4>{percentComplete}% complete</h4>
            <p>
              You are on:{' '}
              <h3>
                Season {currentEpisode.season_number} Episode{' '}
                {currentEpisode.episode_number}: {currentEpisode.name}
              </h3>
            </p>
          </div>
        )}
        <p>First episode date: {show.first_air_date}</p>
        <p>Last episode date: {show.last_air_date}</p>
        <p>Total number of seasons: {show.number_of_seasons}</p>
        <p>Total number of episode: {show.number_of_episodes}</p>
        {/* italic for tagline */}
        <button onClick={requestChat} className="request-button">
          {!chatRequested
            ? 'Chat about the Latest Episode'
            : 'Added to chat bar'}
        </button>
      </div>
    );
  };

  return (
    <CurrentShowContext.Provider
      value={{
        showDetail: show,
        userTVShow: userTVShow,
        setUserTVShow: setUserTVShow,
      }}
    >
      {renderSpinner()}
      <Sidebar />
      <StyledShow>
        <Navbar showSearch={false} />
        <div className="show-view">
          <div className="image-button-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                currentPosterPath || userTVShow.poster_path
              }`}
            />
            <div className="button-container">
              <Button onClick={handleOpen}>Show Details</Button>
              {renderDetailsModal()}
            </div>
          </div>
          {renderShowDetails()}
          <Backintime show={show} currentEpisode={userTVShow.episodeCodeUpTo} />
        </div>
        <Episodechooser seasons={show.seasons} />
        <Forum />
      </StyledShow>
    </CurrentShowContext.Provider>
  );
}

export default Show;
