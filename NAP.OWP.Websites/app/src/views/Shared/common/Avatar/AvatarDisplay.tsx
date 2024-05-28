import AccountIcon from 'mdi-react/AccountIcon';
import React from 'react';
import { getUrlTicketFile } from '../../chatBoardNew/helper/chatBoardHelper';
import Avatar from '@mui/material/Avatar';

interface AvatarDisplayProps {
  imageFileName: string | null | undefined;
  size?: number;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ imageFileName, size = 27 }) => {
  const imageUrl = getUrlTicketFile(imageFileName);

  return (
    <div>
      {imageFileName ? (
        <Avatar
          sx={{ width: size, height: size }}
          alt={'Avatar'}
          src={imageUrl}
        />
      ) : (
        <div style={{ ...styles.center, width: size, height: size }}>
          <AccountIcon size={size * 0.8} color='#9fb0bc' />
        </div>
      )}
    </div>
  );
};

const styles = {
  avatar: {
    borderRadius: '50%',
    backgroundColor: '#f1eded',
  },
  center: {
    borderRadius: '50%',
    backgroundColor: '#f1eded',
    textAlign: 'center' as 'center',
  }
};

export default AvatarDisplay;
