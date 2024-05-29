import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { updateReactIconMessage } from '../chatBoardNew/chatBoardThunkNative';
import { ReactionIcon } from '../chatBoardNew/const/index.json';
import AvatarDisplay from '../common/Avatar/AvatarDisplay';
import useStableDispatch from '../customHook/useStableDispatch';

type UseReact = {
  userName: string;
  userId: number;
  avatarLink: string;
};

type Props = {
  iconKey: string;
  userReact: UseReact[];
  messageId: number;
  ticketId: number;
};

const TableEmoji = (userReacts: UseReact[]) => {
  return (
    <table>
      <tbody>
        {userReacts?.map(x => (
          <tr key={uniqueId()}>
            <td>
              <AvatarDisplay imageFileName={x.avatarLink} size={15} />
            </td>
            <td className='user-name-message-icon'>{x.userName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const IconEmoji = ({ iconKey, userReact, messageId, ticketId }: Props) => {
  const dispatch = useStableDispatch();
  const actorId = useSelector(state => state?.pagePolicy?.permission?.ActorId);

  const uuidKey = `custom-tooltip-${uniqueId()}`;
  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const model = {
      messageId,
      creatorId: actorId,
      iconKey,
      ticketId
    };
    dispatch(updateReactIconMessage(model));
  };

  return (
    <div>
      <div
        data-tip
        data-for={uuidKey}
        onClick={handleOnClick}
        className='icon-box'>
        {ReactionIcon.find(x => x.label === iconKey)?.node}
        {userReact.length > 1 && userReact.length}
      </div>
      <ReactTooltip
        id={uuidKey}
        place='top'
        effect='solid'
        className='custom-tooltip'>
        {TableEmoji(userReact)}
      </ReactTooltip>
    </div>
  );
};

export default IconEmoji;
