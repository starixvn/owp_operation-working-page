import React, { useCallback } from 'react';
import MultipleSelection from '../../Shared/MultipleSelection/MultipleSelection';
import { TMultipleSelectionTemplate } from '../types/filterType';
import { Option } from '../../Shared/MultipleSelection/type';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
import { setFilter } from './filterSlice';

const MultipleSelectionTemplate = (props: TMultipleSelectionTemplate) => {
  const dispatch = useStableDispatch();
  const handleChange = useCallback((event: Option[]) => {
    dispatch(setFilter({
      key: props.filterKey,
      value: event.map(e => e.value)
    }));
  }, [dispatch, props.filterKey]);

  return (
    <MultipleSelection
      label={props.label}
      options={props.options}
      value={props.options}
      disabled={props.disabled}
      onChange={handleChange} />
  );
};

export default MultipleSelectionTemplate;