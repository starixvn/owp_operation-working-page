import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from '../views/Layout';
import Feedback from '../views/Feedback/Feedback.tsx';
import '../scss/pages/_Feedback.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Layout view={<Feedback />} title='Feedback' />);
