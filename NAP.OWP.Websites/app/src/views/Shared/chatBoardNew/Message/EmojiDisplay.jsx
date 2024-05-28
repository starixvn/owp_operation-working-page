import IconEmoji from '../../../Shared/IconCustom/IconEmoji';
import { ReactionIcon } from '../const/index.json';

const EmojiDisplay = ({ messageReactIcons }) => {
  const result = groupByIconKey(messageReactIcons);
  console.log(result);

  return (
    <>
      {result.map(item => (
        <IconEmoji
          key={item.messageId}
          iconKey={item.iconKey}
          userReact={item.userReact}
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
        iconKey: ReactionIcon.find(x => x.label === icon.iconKey).node,
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
