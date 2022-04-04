import React, { useContext } from 'react';
import { CurrentShowContext } from '../../App';
import { EpisodechooserProps } from '../../proptypes';
import { constructEpCode, getBackground } from './episode-chooser-helpers';
import StyledEpisodeChooser from './episodechooser.styled';
import useEpisodeUpTo from './useEpisodeUpTo';

function Episodechooser({ seasons }: EpisodechooserProps) {
  const { userTVShow } = useContext(CurrentShowContext);

  const {
    episodeUpTo,
    setEpisodeUpTo,
    selectedTab,
    setSelectedTab,
    updateCurrentEp,
  } = useEpisodeUpTo();

  //////////// RENDER

  const renderSeason = (index: number) => {
    return (
      <li
        key={index}
        onClick={() => setSelectedTab(index)}
        style={getBackground(index, selectedTab)}
      >
        Season {index + 1}{' '}
      </li>
    );
  };

  const renderEps = (season: number, episodes: Episode[]) => {
    const [seasonUpToNumber, episodeUpToNumber] = episodeUpTo
      .slice(1)
      .split('e')
      .map((n) => parseInt(n));

    return episodes.map((episode, i) => {
      const hasWatched =
        episode.season_number < seasonUpToNumber ||
        (episode.season_number === seasonUpToNumber &&
          episode.episode_number <= episodeUpToNumber);
      const style = {
        backgroundColor: hasWatched ? '#278036' : '#52525b',
      };
      const num =
        episode.episode_number < 10
          ? `0${episode.episode_number}`
          : episode.episode_number;
      return (
        <div
          className="episode"
          key={i}
          style={style}
          onClick={() => updateCurrentEp(episode.episode_number)}
        >
          <div> {num} </div>
          {hasWatched ||
          constructEpCode(
            episode.season_number,
            episode.episode_number,
            userTVShow.episodeCodeNext
          ) === userTVShow.episodeCodeNext ? (
            <span>{episode.name}</span>
          ) : (
            ''
          )}
        </div>
      );
    });
  };

  return seasons ? (
    <StyledEpisodeChooser>
      <ul className="tabs">
        {seasons.map((season: Season, index: number) => renderSeason(index))}
      </ul>
      <div className="main">
        <h1>{"I've watched up to:"}</h1>
        <div className="episodes">
          {episodeUpTo &&
            seasons[selectedTab] &&
            renderEps(selectedTab, seasons[selectedTab].episodes)}
        </div>
      </div>
    </StyledEpisodeChooser>
  ) : (
    <></>
  );
}

export default Episodechooser;
