import { useAppSelector } from '../../app/hookNative';
import { isEquals } from 'immutability-helper';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import Loading from '../../../components/Loading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = () => {
  const { dataSource, loading } = useAppSelector(state => state.events);

  if (isEquals(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return <table className='table__provider__verification'>
    <TableHeader />
    <TableBody dataSource={dataSource} />
  </table>;
};

export default Table;