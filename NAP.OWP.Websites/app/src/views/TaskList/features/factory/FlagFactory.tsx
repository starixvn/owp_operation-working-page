import { PesOrFiFa } from '../../type/TTaskListTable';
import PesIcon from '../component/PesIcon';
import FifaIcon from '../component/FifaIcon';

const FlagFactory = (props: PesOrFiFa) => {
  const { IsPESOther, IsFIFA, IsPES23, IsPES24 } = props;
  let flag = null;

  if (IsPESOther || IsPES23 || IsPES24) {
    flag = <PesIcon {...props} />;
  }
  if (IsFIFA) {
    flag = <FifaIcon {...props} />;
  }
  return flag;
};

export default FlagFactory;
