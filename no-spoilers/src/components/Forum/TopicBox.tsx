import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainState, TopicProps, TopicsProps } from '../../proptypes';
import StyledTopicBox from './topicbox.styled';
import ForumReplies from './ForumReplies';
import { ForumContext } from '../../App';
import ForumAPI from '../../API/forum-api';

function TopicBox({ topic }: TopicProps) {
  const user = useSelector<MainState>((state) => state.user.user) as User;
  const { updateTopic, topics, deleteTopic, updateTopicBody } =
    useContext(ForumContext);
  const [topicVisible, setTopicVisible] = useState<boolean>(!topic.isReported);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState(topic.body);

  useEffect(() => {
    setTopicVisible(!topic.isReported);
  }, [topics]);

  const vote = async (e: SyntheticEvent, vote: number) => {
    e.stopPropagation();
    e.preventDefault();

    let response;

    if (vote === 1) {
      response = await ForumAPI.topic.upvote(
        user._id.toString(),
        topic._id?.toString() as string
      );
    } else {
      response = await ForumAPI.topic.downvote(
        user._id.toString(),
        topic._id?.toString() as string
      );
    }

    if (response) {
      const updatedTopic = Object.assign({}, topic);
      updatedTopic.voteScore += vote;
      updateTopic(updatedTopic);
    }
  };

  const handleOpenEdit = () => {
    if (isEditing) setEditValue(topic.body);
    setIsEditing(!isEditing);
  };

  const deleteTopicHandler = async () => {
    const confirm = await ForumAPI.topic.delete(topic);

    if (confirm) deleteTopic(topic);
  };

  const renderBody = () => {
    return !isEditing ? (
      <p className="topic-body-text">{topic.body}</p>
    ) : (
      <div
        className="edit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <textarea
          className="edit-box"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        ></textarea>
        <button className="button" onClick={handleUpdateTopic}>
          Update
        </button>
      </div>
    );
  };

  const handleUpdateTopic = async () => {
    const success = await ForumAPI.topic.updateTopic(
      topic._id?.toString() as string,
      topic.title,
      editValue
    );

    if (success) updateTopicBody(topic, editValue);
    setIsEditing(false);
  };

  const formatEpisode = (epCode: string) => {
    const nums = epCode.slice(1).split('e');
    return `Season ${nums[0]}, Episode ${nums[1]}`;
  };

  return topic ? (
    <StyledTopicBox>
      <div className="topic-main">
        <div className="text-container">
          <div
            className="score"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div onClick={(e) => vote(e, 1)}>
              <button className="up"></button>
            </div>
            <div className="number">{topic.voteScore}</div>
            <div onClick={(e) => vote(e, -1)}>
              <button className="down"></button>
            </div>
          </div>

          <div
            className="topic-header"
            onClick={() => setTopicVisible(!topicVisible)}
          >
            <div className="title-and-date">
              <div className="top-row">
                <h3 className="title">
                  {topic.isReported
                    ? 'This topic has been reported for possible spoiler, awaiting review. Click to reveal'
                    : topic.title}{' '}
                  <span>
                    (Posting about {formatEpisode(topic.episodeCode)})
                  </span>
                </h3>
                {topic.authorUserId === user._id.toString() && (
                  <div
                    className="user-buttons"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <button
                      className="remove-button"
                      onClick={() => deleteTopicHandler()}
                    >
                      Delete Post
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleOpenEdit()}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <div>{new Date(topic.date).toDateString()}</div>
            </div>
            <div
              style={{ display: topicVisible ? 'flex' : 'none' }}
              className="bottom-half"
            >
              <div className="user-info">
                <div className="avatar">
                  <img
                    src={`https://avatars.dicebear.com/api/${topic.avatar}`}
                  ></img>
                </div>
                <div className="author-name">{topic.authorName}</div>
              </div>

              <div className="topic-content">{renderBody()}</div>
            </div>
          </div>
        </div>
      </div>

      <ForumReplies topic={topic} topicVisible={topicVisible} />
    </StyledTopicBox>
  ) : (
    <></>
  );
}

export default TopicBox;
