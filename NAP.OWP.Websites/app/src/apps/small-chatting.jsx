import { createRoot } from 'react-dom/client';
import SmallChattingWrapper from '../views/SmallChatting/SmallChattingWrapper';
import '../scss/components/_chatboard.scss';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<SmallChattingWrapper></SmallChattingWrapper>);
