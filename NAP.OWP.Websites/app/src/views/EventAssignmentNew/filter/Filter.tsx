import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import queryDataTableThunk from '../table/queryDataTableThunk';

const Filter = () => {
  const stableDispatch = useAppDispatch();
  useEffect(() => {
    stableDispatch(queryDataTableThunk());
  });
  return (
    <div>

    </div>
  );
};

export default Filter;