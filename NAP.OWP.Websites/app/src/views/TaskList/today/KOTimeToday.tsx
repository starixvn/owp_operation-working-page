import { KOTimeCellProps, PesOrFiFa } from '../type/TTaskListTable';
import FlagFactory from '../features/factory/FlagFactory';
import KOTime from '../features/component/KOTime';

const KOTimeToday = (props: KOTimeCellProps) => {
  const { dataSource, rowIndex } = props;
  const { IsFIFA, IsPESOther, IsPES23, IsPES24 } = dataSource;

  const flagsProps: PesOrFiFa = {
    IsFIFA,
    IsPES23,
    IsPESOther,
    IsPES24,
    rowIndex
  };

  return (
    <>
      <KOTime
        rowIndex={rowIndex}
        dataSource={dataSource}
        flagElement={<FlagFactory {...flagsProps} />}
      />
    </>
  );
};

export default KOTimeToday;
