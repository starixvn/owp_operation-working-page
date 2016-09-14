import React from 'react';
import { noop } from 'lodash';

export default React.createContext({
  onUpdateAssignments: noop
});
