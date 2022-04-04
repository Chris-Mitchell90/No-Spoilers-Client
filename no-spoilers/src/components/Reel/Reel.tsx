import { Button, Tooltip } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import TVShowAPI from '../../API/TVShow-api';
import { ReelProps } from '../../proptypes';
import { UserActionCreators } from '../../state/action-creators';

function Reel({ userTVShows, isCompleted }: ReelProps) {
  const navigate = useNavigate();
  const goToShowPage = (showId: number) => {
    navigate(`/show/${showId}`, {
      replace: true,
    });
  };

  const dispatch = useDispatch();
  const { removeUserShowAction, updateUserShowAction } = bindActionCreators(
    UserActionCreators,
    dispatch
  );

  const markComplete = async (show: UserTVShow) => {
    const updatedShow = await TVShowAPI.setWatched(
      show.TMDB_show_id.toString(),
      show.userId
    );

    if (updatedShow) updateUserShowAction(updatedShow);
  };

  const deleteShow = async (e: SyntheticEvent, show: UserTVShow) => {
    e.preventDefault();
    const isDeleted = await TVShowAPI.delete(
      '' + show.TMDB_show_id,
      show.userId
    );

    isDeleted && removeUserShowAction(show.TMDB_show_id);
  };

  return (
    <div className="poster-container">
      {userTVShows.map((show, index) => {
        return (
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${
                show.current_poster_path || show.poster_path
              } `}
              onClick={() => goToShowPage(show.TMDB_show_id)}
            />
            <div className="btn">
              {!isCompleted && (
                <Tooltip title="Mark as Complete" arrow>
                  <Button
                    variant="outlined"
                    className="completed"
                    onClick={() => markComplete(show)}
                  >
                    ✔
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="Delete the show" arrow>
                <Button
                  variant="outlined"
                  className="delete"
                  onClick={(e) => deleteShow(e, show)}
                >
                  ✖
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Reel;
