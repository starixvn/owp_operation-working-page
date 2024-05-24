import React from 'react';
import IconEmoji from '../../../Shared/IconCustom/IconEmoji';

const EmojiDisplay = () => {
  return (
    <>
      <IconEmoji
        iconKey='👍'
        userReact={[
          {
            avatarLink:
              'https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg',
            userId: 8,
            userName: ' manchester '
          },
          {
            avatarLink:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWXBVkKKsTR80lsKhd092XBKI63nspJ8bptTd01qgFw&s',
            userId: 8,
            userName: ' city '
          },
          {
            avatarLink:
              'https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg',
            userId: 8,
            userName: ' liam '
          }
        ]}></IconEmoji>
      <IconEmoji
        iconKey='❤️'
        userReact={[
          {
            avatarLink:
              'https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg',
            userId: 8,
            userName: ' manchester '
          }
        ]}></IconEmoji>
    </>
  );
};

export default EmojiDisplay;
