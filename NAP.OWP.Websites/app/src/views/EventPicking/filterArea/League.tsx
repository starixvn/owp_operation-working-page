import { RootState } from '../app/store';
import MultipleSelectionTemplate from './MultipleSelectionTemplate';
import { LEAGUE } from './filterConst.json';
import { useSelector } from 'react-redux';

const League = () => {
  const { leagues } = useSelector((state: RootState) => state.filter);
  return (
    <MultipleSelectionTemplate
      className='league'
      label='League'
      options={leagues}
      value={leagues}
      filterKey={LEAGUE}
      disabled={false}
      disableSearch={false} />
  );
};

export default League;