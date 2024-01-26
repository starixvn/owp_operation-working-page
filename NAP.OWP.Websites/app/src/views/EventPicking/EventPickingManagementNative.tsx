import Filter from './filterArea/Filter';
import { OWPPage, OWPHeader, OWPBody } from '../Shared/common/OWP/OPWPage';
import EventPickingTable from './table/EventPickingTable';
import usePermission from '../Shared/customHook/usePermission';
import { FunctionKeys } from '../Shared/Constants';
import Loading from '../components/Loading';

const EventPickingManagementNative = () => {
  const pagePolicy = usePermission(FunctionKeys.EventPickingNew, 'pagePolicy');
  const turnOverMarginPolicy = usePermission(
    FunctionKeys.EventPickingNew_EventAndPerformance,
    'turnOverMarginPolicy'
  );

  if (
    !turnOverMarginPolicy.permission.Username ||
    !pagePolicy.permission.Username
  ) {
    return <Loading />;
  }

  return (
    <div className='event-picking'>
      <OWPPage className='event-picking-page'>
        <OWPHeader className='tickets-tab'>
          <Filter />
        </OWPHeader>

        <OWPBody className='tickets-tab'>
          <EventPickingTable />
        </OWPBody>
      </OWPPage>
    </div>
  );
};

export default EventPickingManagementNative;
