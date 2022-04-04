import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { BackintimeProps, MainState } from '../../proptypes';
import StyledBackInTime from './BackInTime.styled';
import downArrow from './image/down.png';
import { CurrentShowContext } from '../../App';
import WaybackAPI from '../../API/wayback-api';
import { extractDate } from './helpers';

function Backintime({ show, currentEpisode }: BackintimeProps) {
  const user: User = useSelector<MainState>((state) => state.user.user) as User;

  const { userTVShow } = useContext(CurrentShowContext);

  const [waybackUrls, setWaybackUrls] = useState<ExternalIds>(
    {} as ExternalIds
  );
  const [userWaybackUrls, setUserWaybackUrls] = useState<Array<UserWayback>>(
    []
  );
  const [currentUserWayback, setCurrentUserWayback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addUserWayback = async (website: string) => {
    const response = await WaybackAPI.addUrl(
      user._id,
      website,
      show.TMDB_show_id
    );

    response && setUserWaybackUrls([...userWaybackUrls, response]);
  };

  const handleAddWayback = (e: SyntheticEvent) => {
    e.preventDefault();
    addUserWayback(currentUserWayback);
  };

  useEffect(() => {
    setIsLoading(true);

    const getWaybacks = async () => {
      const result = await WaybackAPI.getUrls(
        user._id,
        userTVShow.TMDB_show_id
      );
      setWaybackUrls(result);
      setIsLoading(false);
    };

    const getUserWaybacks = async () => {
      await WaybackAPI.updateUserWayback(user._id, userTVShow.TMDB_show_id);
      const userWaybacks = await WaybackAPI.getUserUrls(
        user._id,
        userTVShow.TMDB_show_id
      );
      setUserWaybackUrls(userWaybacks || []);
    };

    if (user && userTVShow.TMDB_show_id) {
      getWaybacks();
      getUserWaybacks();
    } else {
      console.error('in wayback. user or userTV is undefined');
    }
  }, [currentEpisode]);

  const renderClockLoader = () => {
    return (
      isLoading && (
        <>
          <ClockLoader
            loading={isLoading}
            color={'#ffffff'}
            size={200}
            speedMultiplier={3}
            css={`
              margin-top: 30px;
              margin-left: auto;
              margin-right: auto;
              display: block;
              border-color: red;
            `}
          />
        </>
      )
    );
  };

  const renderUrl = (id: string, name: string) => {
    if (waybackUrls[id]) {
      return (
            <a
            href={waybackUrls[id] as string}
            target="_blank"
            rel="noreferrer noopener"
          > {name + ' '}
           (
            {extractDate(waybackUrls[id] as string).toLocaleDateString()})
            </a>
            );
    }
  };

  const renderUserWayback = (wayback: UserWayback) => {
    if (!wayback) return <></>;
    if (!wayback.waybackUrl) {
      return (
        <>
          <a
            href={wayback.waybackUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {wayback.name} ({'Current - No snapsnot found before next episode'})
          </a>
        </>
      );
    }

    if (wayback.waybackUrl === wayback.name) {
      return (
        <a href={wayback.waybackUrl} target="_blank" rel="noreferrer noopener">
          {wayback.name} ({'Current'})
        </a>
      );
    }

    return (
      <a href={wayback.waybackUrl} target="_blank" rel="noreferrer noopener">
        {wayback.name}
        <br /> (
        {extractDate(wayback.waybackUrl as string).toLocaleDateString() ||
          'None Found'}
        )
      </a>
    );
  };

  return (
    <StyledBackInTime>
      <div className="dropdown">
        <button className="dropbtn">
          {isLoading ? (
            <h5>Calculating Historic Websites from wayback machine</h5>
          ) : (
            <span>
              {show.name} related websites from before your next episode:{' '}
            </span>
          )}
          <img src={downArrow} />
        </button>
        {renderClockLoader()}
        {!isLoading && (
          <div className="dropdown-content">
            {renderUrl('facebook_id', 'Facebook')}
            {renderUrl('instagram_id', 'Instagram')}
            {renderUrl('twitter_id', 'Twitter')}
            {renderUrl('imdb_id', 'IMDb')}
            {renderUrl('wikipedia_id', 'Wikipedia')}
            {userWaybackUrls &&
              userWaybackUrls.length > 0 &&
              userWaybackUrls.map((wayback) => renderUserWayback(wayback))}
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Enter your own website"
                  value={currentUserWayback}
                  onChange={(e) => setCurrentUserWayback(e.target.value)}
                />
              </div>
              <div>
                <button onClick={(e) => handleAddWayback(e)}>Add</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </StyledBackInTime>
  );
}

export default Backintime;
