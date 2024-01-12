import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from '../views/Layout';
import EventPickingAppNative from '../views/EventAssignmentNew/EventPickingAppNative';
import '../scss/components/_chatboard.scss';
import '../views/components/Assignment/assignment.scss';
import '../scss/pages/_EventAssignment.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Layout view={<EventPickingAppNative />} title='Live Game Assignment New' />
);
