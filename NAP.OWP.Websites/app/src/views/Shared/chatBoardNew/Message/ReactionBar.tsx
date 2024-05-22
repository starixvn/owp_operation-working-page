import { ReactionBarSelector } from '@charkour/react-reactions';

type ReactionBarProps = {
  isOpenReactionIcon: boolean;
  setIsOpenReactionIcon: (isOpen: boolean) => void;
};

const ReactionBar = ({
  isOpenReactionIcon,
  setIsOpenReactionIcon
}: ReactionBarProps) => {
  const reactionIcon = [
    { label: 'love', node: <div>❤️</div>, key: 'heart' },
    { label: 'like', node: <div>👍</div>, key: 'like' },
    { label: 'collaboration', node: <div>🤝</div>, key: 'collaboration' },
    { label: 'checked', node: <div>✅</div>, key: 'check-green' },
    { label: 'ok', node: <div>👌</div>, key: 'ok' }
  ];
  const handleOnSelectReactionIcon = (key: string) => {
    setIsOpenReactionIcon(false);
    console.log(key);
  };
  return (
    <>
      {isOpenReactionIcon && (
        <div className='list-icon-reaction'>
          <ReactionBarSelector
            iconSize={20}
            reactions={reactionIcon}
            onSelect={handleOnSelectReactionIcon}
          />
        </div>
      )}
    </>
  );
};
export default ReactionBar;
