import { Provider } from 'react-redux';
import store from './app/store';
import TicketDetailLayout from './SmallChatting';
type Props = {};

const SmallChattingWrapper = (props: Props) => {
  return (
    <div>
      <Provider store={store}>
        <TicketDetailLayout></TicketDetailLayout>
      </Provider>
    </div>
  );
};

export default SmallChattingWrapper;
