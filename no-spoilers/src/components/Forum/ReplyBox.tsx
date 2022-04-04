import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { MainState, ReplyProps } from '../../proptypes';
import { useSelector } from 'react-redux';
import StyledReplyBox from './reply-box.styled';
import Reply from '@material-ui/icons/Reply';
import Button from '@mui/material/Button';
import redFlag from './image/red-flag.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { ForumContext } from '../../App';
import ForumAPI from '../../API/forum-api';

// Needs the conditional

function ReplyBox({ reply, userTVShow }: ReplyProps) {
  const user = useSelector<MainState>((state) => state.user.user) as User;
  const { topics, updateTopic, deleteReply, updateReply } =
    useContext(ForumContext);

  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState(reply.body);

  const Helpers = {
    isReplierFurtherAlong: () => {
      if (reply.authorUserId === user._id) return false;

      return reply.replierEpisodeUpTo > userTVShow.episodesWatchedSoFar;
    },
    isReplierTheUser: () => {
      return reply.authorUserId === user._id;
    },
  };

  useEffect(() => {
    userTVShow &&
      setIsExpanded(!Helpers.isReplierFurtherAlong() && !reply.isReported);
  }, [userTVShow]);

  ////////////// HANDLERS

  const deleteReplyHandler = async () => {
    const confirm = await ForumAPI.reply.delete(reply);

    if (confirm) deleteReply(reply);
  };

  const openReport = (e: SyntheticEvent) => {
    setReportFormOpen(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleReport = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const report: Report = {
      reporterId: user._id.toString(),
      offendingUserId: reply.authorUserId.toString(),
      offenceType: reportText,
      type: 'Reply',
      topicId: reply.topicId?.toString() as string,
      replyId: reply._id?.toString() as string,
    };

    const response = await ForumAPI.reportTopicOrReply(report);
    const topic = topics.find(
      (top: UserTopic) => top._id === reply.topicId
    ) as UserTopic;
    const updatedTopic = Object.assign({}, topic);
    (
      updatedTopic.replies.find((rep) => rep._id === reply._id) as Reply
    ).isReported = true;

    if (response.status === 200) {
      updateTopic(updatedTopic);
    }

    setReportFormOpen(false);
  };

  const handleOpenEdit = () => {
    if (isEditing) setEditValue(reply.body);
    setIsEditing(!isEditing);
  };

  const handleUpdateReply = async () => {
    const success = await ForumAPI.reply.update(
      reply.topicId.toString(),
      reply._id.toString(),
      editValue
    );

    if (success) updateReply(reply, editValue);
    setIsEditing(false);
  };
  ////////////// RENDER

  const renderReplierProgress = () => {
    const diff = Math.abs(
      reply.replierEpisodeUpTo - userTVShow.episodesWatchedSoFar
    );

    if (reply.authorUserId !== user._id) {
      if (reply.replierEpisodeUpTo > userTVShow.episodesWatchedSoFar) {
        return (
          <>
            <span className="replier-progress-ahead replier-progress">
              Seen {diff} {diff === 1 ? 'episode' : 'episodes'} more than you
              when posted
            </span>
          </>
        );
      }

      if (reply.replierEpisodeUpTo < userTVShow.episodesWatchedSoFar) {
        return (
          <>
            <span className="replier-progress-behind replier-progress">
              Seen {diff} {diff === 1 ? 'episode' : 'episodes'} less than you
              when posted
            </span>{' '}
          </>
        );
      }

      return (
        <>
          <span className="replier-progress-same replier-progress">
            on the same episode when posted
          </span>{' '}
        </>
      );
    }
    return <></>;
  };

  const renderReport = () => {
    return (
      <span>
        {reply.isReported ? (
          <span
            style={{
              color: 'darkred',
              marginLeft: '20px',
              fontSize: 12,
            }}
          >
            (Possible Spoiler - click to open)
          </span>
        ) : (
          <Button
            className="report-btn report-reply-btn"
            onClick={(e) => openReport(e)}
          >
            <img src={redFlag} />
          </Button>
        )}
      </span>
    );
  };

  const renderAuthorControls = () => {
    return (
      <div
        className="user-buttons"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button className="remove-button" onClick={() => deleteReplyHandler()}>
          Delete
        </button>
        <button className="edit-button" onClick={() => handleOpenEdit()}>
          Edit
        </button>
      </div>
    );
  };

  const renderReportForm = () => {
    return (
      <div
        className="report-box"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Dialog
          open={reportFormOpen}
          onClose={() => setReportFormOpen(true)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {/* <DialogTitle>{topic.title}</DialogTitle> */}
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

          <DialogActions
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {/* TODO: Report button needs to send info the db */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {' '}
              <Button onClick={(e) => handleReport(e)} value="rep">
                Report
              </Button>
            </div>
            <Button onClick={() => setReportFormOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const renderBody = () => {
    return !isEditing ? (
      <p>{reply.body}</p>
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
        <button onClick={handleUpdateReply}>Update</button>
      </div>
    );
  };

  return (
    <StyledReplyBox>
      <Accordion
        id="reply-box"
        expanded={isExpanded}
        onClick={(e) => {
          if (!reportFormOpen) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="reply-summary"
        >
          <Typography className="replier-bar">
            <Reply />
            <div className="reply-avatar">
              <img src={`https://avatars.dicebear.com/api/${reply.avatar}`} />
            </div>
            {Helpers.isReplierTheUser() ? 'You' : reply.authorName},{' '}
            {renderReplierProgress()}
            {reply.authorUserId !== user._id
              ? renderReport()
              : renderAuthorControls()}
            {renderReportForm()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="reply-content">
          <Typography>{renderBody()}</Typography>
        </AccordionDetails>
      </Accordion>
    </StyledReplyBox>
  );
}

export default ReplyBox;
