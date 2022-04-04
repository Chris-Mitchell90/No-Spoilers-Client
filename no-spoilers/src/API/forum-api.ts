import { get, post, patch } from './api-client';

export const addTopic = async (
  topicBody: TopicRequest,
  TMDB_show_id: number
) => {
  try {
    const createdTopic = await post(
      `/forum/topic/add/${TMDB_show_id}`,
      topicBody
    );
    return createdTopic.data as UserTopic;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const fetchTopics = async (TMDB_show_id: string, userId: string) => {
  console.log(TMDB_show_id);
  if (TMDB_show_id && userId) {
    try {
      const topics = await get(`/forum/load/${TMDB_show_id}`);

      if (topics.data === 'No topics found') return [];

      return topics.data as UserTopic[];
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
};

export const postReply = async (
  TMDB_show_id: number,
  userId: number,
  topicId: string,
  body: string
) => {
  try {
    const reply = await post(`/forum/reply/add/${TMDB_show_id}`, {
      body,
      topicId,
    });

    return reply.data as Reply;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const upVotePost = async (userId: string, topicId: string) => {
  const response = await patch(`/forum/topic/upvote`, {
    topicId,
  });
  return response;
};

export const downVotePost = async (userId: string, topicId: string) => {
  const response = await patch(`/forum/topic/downvote`, {
    topicId,
  });

  return response;
};

export const reportTopicOrReply = async (report: Report) => {
  const response = await post(`/forum/report`, report);

  return response;
};

export const deleteTopics = async (topic: UserTopic) => {
  const response = await post(`/forum/topic/delete`, {
    topicId: topic._id,
  });

  if (response.status === 200) return true;
  return false;
};

export const deleteReplies = async (reply: Reply) => {
  const response = await post(`/forum/reply/delete`, {
    topicId: reply.topicId,
    replyId: reply._id,
  });

  if (response.status === 200) return true;
  return false;
};

export const postUpdateReply = async (
  topicId: string,
  replyId: string,
  body: string
) => {
  const response = await patch(`/forum/reply/edit`, { topicId, replyId, body });

  if (response.status === 200) return true;
  return false;
};

export const postUpdateTopic = async (
  topicId: string,
  body: string,
  title: string
) => {
  const response = await patch(`/forum/topic/edit`, {
    topicId,
    title,
    body,
  });

  if (response.status === 200) return true;
  return false;
};

const ForumAPI = {
  topic: {
    index: fetchTopics,
    add: addTopic,
    delete: deleteTopics,
    updateTopic: postUpdateTopic,
    upvote: upVotePost,
    downvote: downVotePost,
  },
  reply: {
    update: postUpdateReply,
    delete: deleteReplies,
    add: postReply,
  },
  reportTopicOrReply: reportTopicOrReply,
};

export default ForumAPI;
