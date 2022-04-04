import { MainState, TopicProps } from '../../proptypes';
import StyledForumReplies from './forumReplies.styled';
import redFlag from './image/red-flag.png';
import reply from './image/reply.png';
import hide from './image/hide.png';
import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReplyBox from './ReplyBox';
import { useSelector } from 'react-redux';
import { CurrentShowContext, ForumContext } from '../../App';
import ForumAPI from '../../API/forum-api';

function ForumReplies({ topic, topicVisible }: TopicProps) {
  const user = useSelector<MainState>((state) => state.user.user) as User;

  const { userTVShow } = useContext(CurrentShowContext);

  const { addReply, updateTopic } = useContext(ForumContext);

  const [open, setOpen] = useState(false);
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [replyText, setReplyText] = useState<string>('');
  const [showReplies, setShowReplies] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleSendReply = async () => {
    const newReply = await ForumAPI.reply.add(
      userTVShow.TMDB_show_id,
      user._id,
      '' + (topic._id as number),
      replyText
    );

    if (newReply) addReply(topic, newReply);
    setReplyText('');
    setShowReplies(true);
    setOpen(false);
  };

  const showReplyBox = () => {
    if (topic.numberOfReplies === 0) return;
    setShowReplies(!showReplies);
  };

  useEffect(() => {
    if (!topicVisible) setShowReplies(false);
  }, [topicVisible]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  //modal overridding mui's style below
  const divStyle = {
    width: '600px',
  };

  const report = async () => {
    const report: Report = {
      reporterId: user._id.toString(),
      offendingUserId: topic.authorUserId,
      offenceType: reportText,
      type: 'Topic',
      topicId: topic._id?.toString() as string,
      replyId: '',
    };

    const response = await ForumAPI.reportTopicOrReply(report);

    const updatedTopic = Object.assign({}, topic);
    updatedTopic.isReported = true;

    if (response.status === 200) {
      updateTopic(updatedTopic);
    }

    setReportText('');
    setReportFormOpen(false);
  };

  return topic.replies ? (
    <StyledForumReplies>
      <div className="reply-modal">
        <Button
          className="show-hide-btn"
          variant="outlined"
          onClick={() => showReplyBox()}
        >
          {showReplies
            ? 'Hide'
            : `${topic.numberOfReplies} ${
                topic.numberOfReplies === 1 ? 'comment' : 'comments'
              }`}
        </Button>
        <Button
          className="reply-btn"
          variant="outlined"
          onClick={handleClickOpen}
        >
          {' '}
          Reply
          {/* <img src={reply} style={{ transform: 'scale(2)' }} /> */}
        </Button>
        <Button className="report-btn" onClick={() => setReportFormOpen(true)}>
          {/* <img src={redFlag} style={{ transform: 'scale(2)'}} /> */}
          REPORT
        </Button>

        <div className="reply-box">
          <Dialog open={open} onClose={() => setOpen(true)}>
            <div style={divStyle}>
              <DialogTitle>Reply to {topic.authorName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Reply to join the discussion!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Your comment here..."
                  type="text"
                  fullWidth
                  variant="standard"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  autoComplete="none"
                />
              </DialogContent>
            </div>
            <DialogActions>
              <Button onClick={handleSendReply}>Reply</Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="report-box">
          <Dialog open={reportFormOpen} onClose={() => setReportFormOpen(true)}>
            <DialogTitle>Report</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Report a spoiler, or other unsuitable content
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="What are you reporting?"
                type="text"
                fullWidth
                variant="standard"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => report()}>Report</Button>
              <Button onClick={() => setReportFormOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className="replies">
        {showReplies &&
          topic.replies.map((reply, index) => (
            <ReplyBox key={index} reply={reply} userTVShow={userTVShow} />
          ))}
      </div>
    </StyledForumReplies>
  ) : (
    <></>
  );
}

export default ForumReplies;
