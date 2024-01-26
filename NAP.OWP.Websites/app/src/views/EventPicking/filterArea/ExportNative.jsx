import DropdownNative from '../../Shared/common/Dropdown/DropdownNative';
import { EXPORT } from './filterConst.json';
import { exportAndConfirmAllEvent, exportOnly } from '../helper/exportHelper';

const ExportNative = () => {
  const items = [
    {
      title: EXPORT.EXPORT_AND_CHECK_ALL,
      handler: exportAndConfirmAllEvent
    },
    {
      title: EXPORT.EXPORT_ONLY,
      handler: exportOnly
    }
  ];
  return <DropdownNative items={items} />;
};

export default ExportNative;
