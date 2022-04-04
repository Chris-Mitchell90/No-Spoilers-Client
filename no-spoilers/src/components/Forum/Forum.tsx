import React, { useContext, useEffect, useState } from 'react';
import ForumNewTopic from './ForumNewTopic';
import ForumTopicList from './ForumTopicList';
import StyledForum from './forum.styled';
import { useSelector } from 'react-redux';
import { CurrentShowContext, ForumContext } from '../../App';
import { MainState } from '../../proptypes';
import ForumAPI from '../../API/forum-api';

function Forum() {
  const user = useSelector<MainState>((state) => state.user.user) as User;

  const { userTVShow } = useContext(CurrentShowContext);

  const [topics, setTopics] = useState<Array<UserTopic>>([]);

  useEffect(() => {
    if (userTVShow && !Number.isNaN(userTVShow.TMDB_show_id)) {
      const getTopics = async () => {
        let topics = await ForumAPI.topic.index(
          '' + userTVShow.TMDB_show_id,
          '' + user._id
        );
        if (topics) {
          topics = topics?.reverse().flatMap((x) => x);
          setTopics(topics);
        }
      };
      getTopics();
    } else {
      console.error('in forum, userTV or id is not defined');
    }
  }, [userTVShow]);

  // CONTEXT

  const updateTopics = (topic: UserTopic) => {
    setTopics([topic, ...topics]);
  };

  const updateTopic = (topic: UserTopic) => {
    const clone: UserTopic[] = [...topics];
    clone.splice(
      clone.findIndex((oldTopic) => oldTopic._id === topic._id),
      1,
      topic
    );
    setTopics(clone);
  };

  const addReply = (topicToUpdate: UserTopic, reply: Reply) => {
    const topicCopy = Object.assign({}, topicToUpdate);
    const topicsCopy = [...topics];
    topicCopy.replies.push(reply);
    topicCopy.numberOfReplies++;
    topicsCopy.splice(
      topicsCopy.findIndex((topic) => topic._id === topicCopy._id),
      1,
      topicCopy
    );

    setTopics(topicsCopy);
  };

  const deleteTopic = (topicToDelete: UserTopic) => {
    const topicsCopy = [...topics];
    topicsCopy.splice(
      topicsCopy.findIndex((top) => topicToDelete._id === top._id),
      1
    );
    setTopics(topicsCopy);
  };

  const deleteReply = (replyToDelete: Reply) => {
    const topicsCopy = [...topics];

    const topic = topicsCopy.find(
      (topic) => topic._id === replyToDelete.topicId
    );

    if (topic)
      topic.replies.splice(
        topic.replies.findIndex((reply) => reply._id === replyToDelete._id)
      );

    setTopics(topicsCopy);
  };

  const updateReply = async (reply: Reply, newBody: string) => {
    reply.body = newBody;
    const topicsCopy = [...topics];
    setTopics(topicsCopy);
  };

  const updateTopicBody = async (topic: UserTopic, newBody: string) => {
    topic.body = newBody;
    const topicsCopy = [...topics];
    setTopics(topicsCopy);
  };

  return (
    <ForumContext.Provider
      value={{
        topics: topics,
        setTopics: setTopics,
        updateTopics: updateTopics,
        addReply: addReply,
        updateTopic,
        deleteTopic,
        deleteReply,
        updateReply,
        updateTopicBody,
      }}
    >
      <StyledForum>
        <h2>Discussion up to and including this episode</h2>
        <ForumNewTopic />
        <ForumTopicList />
      </StyledForum>
    </ForumContext.Provider>
  );
}

export default Forum;
