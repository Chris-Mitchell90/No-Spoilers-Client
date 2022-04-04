import React from 'react';
import StyledAvatarReel from './avatarReel.styled';
import Tooltip from '@mui/material/Tooltip';
import { AvatarPropType } from '../../proptypes';

function AvatarReel({ setAvatar }: AvatarPropType) {
  return (
    <StyledAvatarReel>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={'https://avatars.dicebear.com/api/male/1.svg'}
            onClick={() => setAvatar('male/1.svg')}
          />
        </Tooltip>
      </div>

      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={'https://avatars.dicebear.com/api/female/1.svg'}
            onClick={() => setAvatar('female/1.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={'https://avatars.dicebear.com/api/male/10.svg'}
            onClick={() => setAvatar('male/10.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={'https://avatars.dicebear.com/api/female/10.svg'}
            onClick={() => setAvatar('female/10.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/male/11.svg`}
            onClick={() => setAvatar('male/11.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/female/11.svg`}
            onClick={() => setAvatar('female/11.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/male/2.svg`}
            onClick={() => setAvatar('male/2.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/female/2.svg`}
            onClick={() => setAvatar('female/2.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/male/14.svg`}
            onClick={() => setAvatar('male/14.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/female/14.svg`}
            onClick={() => setAvatar('female/14.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/male/undefined.svg`}
            onClick={() => setAvatar('male/undefined.svg')}
          />
        </Tooltip>
      </div>
      <div className="avatar-container-internal">
        <Tooltip title="PICK ME!" arrow>
          <img
            src={`https://avatars.dicebear.com/api/female/undefined.svg`}
            onClick={() => setAvatar('female/undefined.svg')}
          />
        </Tooltip>
      </div>
    </StyledAvatarReel>
  );
}

export default AvatarReel;
