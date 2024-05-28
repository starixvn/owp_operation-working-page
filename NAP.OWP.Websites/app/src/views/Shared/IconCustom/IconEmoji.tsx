import { uniqueId } from 'lodash';
import ReactTooltip from 'react-tooltip';
import AvatarDisplay from '../common/Avatar/AvatarDisplay';

type UseReact = {
  userName: string;
  userId: number;
  avatarLink: string;
};

type Props = {
  messageId: number;
  iconKey: string;
  userReact: UseReact[];
};

const TableEmoji = (userReacts: UseReact[]) => (
  <table>
    <tbody>
      {userReacts?.map(x => (
        <tr key={uniqueId()}>
          <td>
            <AvatarDisplay imageFileName={x.avatarLink} size={20} />
          </td>
          <td className='user-name-message-icon'>{x.userName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const IconEmoji = ({ iconKey, userReact, messageId }: Props) => {
  return (
    <div>
      <div data-tip data-for='custom-tooltip'>
        {iconKey}
        {userReact.length > 1 && userReact.length}
      </div>
      <ReactTooltip
        id='custom-tooltip'
        place='top'
        effect='solid'
        className='custom-tooltip'
      >
        {TableEmoji(userReact)}
      </ReactTooltip>
    </div>
  );
};

export default IconEmoji;
