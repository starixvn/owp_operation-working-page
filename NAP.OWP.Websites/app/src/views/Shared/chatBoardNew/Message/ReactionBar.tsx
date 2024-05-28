import { ReactionBarSelector } from '@charkour/react-reactions';
import useStableDispatch from '../../customHook/useStableDispatch';
import { ReactionIcon } from '../const/index.json';
import { saveReactIconMessage } from '../chatBoardThunkNative';

type ReactionBarProps = {
  isOpenReactionIcon: boolean;
  setIsOpenReactionIcon: (isOpen: boolean) => void;
  messageId: number;
  creatorId: number;
};

const ReactionBar = ({
  isOpenReactionIcon,
  setIsOpenReactionIcon,
  messageId, creatorId
}: ReactionBarProps) => {
  const dispatch = useStableDispatch();

  const handleOnSelectReactionIcon = (key: string) => {
    setIsOpenReactionIcon(false);
    const model = {
      messageId,
      creatorId
    };
    dispatch(saveReactIconMessage(model));
    console.log(key);
  };

  return (
    <>
      {isOpenReactionIcon && (
        <div className='list-icon-reaction'>
          <ReactionBarSelector
            iconSize={20}
            reactions={ReactionIcon}
            onSelect={handleOnSelectReactionIcon}
          />
        </div>
      )}
    </>
  );
};
export default ReactionBar;
