import React, { SyntheticEvent, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import ForumAPI from '../../API/forum-api';

import { CurrentShowContext, ForumContext } from '../../App';
import { MainState } from '../../proptypes';
import StyledForumNewTopic from './forumNewTopic.styled';

export default function ForumNewTopic() {
  const { userTVShow, showDetail } = useContext(CurrentShowContext);
  const { updateTopics } = useContext(ForumContext);

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [season, setSeason] = useState<number>();
  const [episode, setEpisode] = useState<number>();
  const [episodeDetail, setEpisodeDetail] = useState<Episode>({} as Episode);

  const user = useSelector<MainState>(
    (state) => state.user.user as User
  ) as User;

  useEffect(() => {
    if (userTVShow.episodeCodeUpTo) {
      const [seas, ep] =
        userTVShow.episodeCodeUpTo &&
        userTVShow.episodeCodeUpTo
          .slice(1)
          .split('e')
          .map((n) => parseInt(n));

      seas && setSeason((seas as number) - 1);
      ep && setEpisode(ep as number);

      season &&
        episode &&
        setEpisodeDetail(
          showDetail.seasons[season as number].episodes[episode as number]
        );
    }
  }, [userTVShow]);

  // TODO change id so it is not hardcoded
  const constructTopic = (): TopicRequest => {
    const requestBody: TopicRequest = {
      _id: user._id.toString(),
      body,
      title,
    };

    return requestBody;
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const topicRequest = constructTopic();

    const newTopic = await ForumAPI.topic.add(
      topicRequest,
      userTVShow.TMDB_show_id
    );

    if (newTopic) updateTopics(newTopic);

    setTitle('');
    setBody('');
  };

  return (
    <StyledForumNewTopic>
      <form>
        <div className="title">
          <div>Title</div>
          <textarea onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        <div className="body">
          <div>Body</div>
          <textarea onChange={(e) => setBody(e.target.value)} value={body} />
        </div>

        <div className="btn">
          <button type="submit" onClick={(e) => submit(e)}>
            Create Topic
          </button>
        </div>
      </form>
    </StyledForumNewTopic>
  );
}
