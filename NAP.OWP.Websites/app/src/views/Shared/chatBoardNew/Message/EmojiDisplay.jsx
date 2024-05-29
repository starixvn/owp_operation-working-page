import IconEmoji from '../../../Shared/IconCustom/IconEmoji';

const EmojiDisplay = ({ messageReactIcons = [], ticketId }) => {
  const result = groupByIconKey(messageReactIcons);

  return (
    <>
      {result.map((item, i) => (
        <IconEmoji
          key={i}
          iconKey={item.iconKey}
          userReact={item.userReact}
          messageId={messageReactIcons[0].messageId}
          ticketId={ticketId}
        />
      ))}
    </>
  );
};

const groupByIconKey = icons => {
  const grouped = icons.reduce((acc, icon) => {
    if (!acc[icon.iconKey]) {
      acc[icon.iconKey] = {
        messageId: icon.messageId,
        iconKey: icon.iconKey,
        userReact: []
      };
    }

    acc[icon.iconKey].userReact.push({
      userId: icon.reactUserId,
      userName: icon.reactUserName,
      avatarLink: icon.reactAvatarName
    });

    return acc;
  }, {});

  return Object.values(grouped);
};

EmojiDisplay.propTypes = {
  messageReactIcons: []
};

export default EmojiDisplay;
