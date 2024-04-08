import { Option } from "../../../../Shared/MultipleSelection/type";
import { MultiSelect } from 'react-multi-select-component';
import store from "../../../app/storeNative";

const AgentConfirmCell = ({ agentConfirm }: { agentConfirm: Option[] }) => {
  const { agentConfirmOption } = store.getState().events;

  return (
    <span className='agent__confirm'>
      <MultiSelect
        onChange={() => { }}
        value={agentConfirm}
        options={agentConfirmOption}
        ClearSelectedIcon={null}
        className='multi-select'
        hasSelectAll

        labelledBy='Select...'
        overrideStrings={{
          selectAll: '-- Select All --',
          allItemsAreSelected: 'All'
        }}
      />
    </span>
  );
};

export default AgentConfirmCell;