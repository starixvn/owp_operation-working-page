import { Option } from "../../../../Shared/MultipleSelection/type";
import { MultiSelect } from 'react-multi-select-component';
import store from "../../../app/storeNative";

const AgentConfirmCell = (
  { agentConfirm, onChange }: {
    agentConfirm: Option[],
    onChange: (value: Option[]) => void
  }) => {
  const { agentConfirmOption } = store.getState().events;
  const { providerPolicy: { permission: { HasWrite } } } = store.getState();

  return (
    <span className='agent__confirm'>
      <MultiSelect
        onChange={onChange}
        value={agentConfirm}
        options={agentConfirmOption}
        ClearSelectedIcon={null}
        className='multi-select'
        hasSelectAll
        disabled={!HasWrite}
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