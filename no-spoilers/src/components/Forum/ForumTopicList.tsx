import React, { useContext, useEffect } from 'react';
import StyledForumTopicList from './forumTopicList.styled';
import TopicBox from './TopicBox';

import { ForumContext } from '../../App';

function ForumTopicList() {
  const { topics } = useContext(ForumContext);

  const renderTopic = (topic: UserTopic, index: number) => {
    return <TopicBox key={index} topic={topic} />;
  };

  const renderTopics = () => {
    if (topics && topics.length) {
      return topics.map((topic, index) => renderTopic(topic, index));
    }
    return <></>;
  };

  return (
    <StyledForumTopicList>{topics && renderTopics()}</StyledForumTopicList>
  );
}

export default ForumTopicList;
