import { Provider } from 'react-redux';
import store from './app/store';
import TicketDetailLayout from './SmallChatting';

const SmallChattingWrapper = () => {
  return (
    <div>
      <Provider store={store}>
        <TicketDetailLayout></TicketDetailLayout>
      </Provider>
    </div>
  );
};

export default SmallChattingWrapper;
