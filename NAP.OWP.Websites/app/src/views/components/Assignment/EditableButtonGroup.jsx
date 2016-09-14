import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditableTextSuggestion from './EditableTextSuggestion';
import EditableTextMention from './EditableTextMention';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import QuestionMarkCircleIcon from 'mdi-react/QuestionMarkCircleIcon';
import PropTypes from 'prop-types';
import { pullAt } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { BetTypeSuggestion } from '../../EventAssignment/constants/Column';

const propTypes = {
  main: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
  others: PropTypes.array,
  matchId: PropTypes.number.isRequired,
  isAllowAdd: PropTypes.bool,
  onSaved: PropTypes.func,
  onDeleted: PropTypes.func,
  betType: PropTypes.number,
  index: PropTypes.string,
  columnName: PropTypes.string,
  rowIndex: PropTypes.number
};

class EditableButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditableMainTraderName: false,
      isEditableOtherTraderName: false,
      isVisibleButtonPlus: true,
      suggestionMainTrader: this.props.main,
      listEditableTextMentions: [],
      matchId: this.props.matchId,
      main: this.props.main,
      policy: this.props.policy,
      isAllowAdd: this.props.isAllowAdd,
      betType: this.props.betType,
      index: this.props.index
    };
    this.onClickButtonPlus = this.onClickButtonPlus.bind(this);
    this.mapEditableTextMention = this.mapEditableTextMention.bind(this);

    this.onEventChangeMainTrader = this.onEventChangeMainTrader.bind(this);
    this.onDeletedMainTrader = this.onDeletedMainTrader.bind(this);

    this.onEventChangeOtherTrader = this.onEventChangeOtherTrader.bind(this);
    this.onDeletedOtherTrader = this.onDeletedOtherTrader.bind(this);
  }

  componentDidMount() {
    const { others, policy } = this.props;
    let listTextMentions = [];
    listTextMentions = others.map((item, index) => {
      return {
        assignmentItem: item,
        dataIndex: index,
        isEditing: false
      };
    });

    this.setState({
      listEditableTextMentions: listTextMentions,
      isVisibleButtonPlus: policy.HasWrite
    });
  }

  mapEditableTextMention(item, index) {
    const { main, policy } = this.state;
    const key = `EditableTextMention_${index}_${item.assignmentItem.AssignmentId}`;

    const { matchId } = this.props;
    return (
      <EditableTextMention
        key={key}
        dataIndex={index}
        policy={policy}
        matchId={matchId}
        mainTrader={main}
        assignmentItem={item.assignmentItem}
        isEditing={item.isEditing}
        onEventChange={this.onEventChangeOtherTrader}
        onDeleted={this.onDeletedOtherTrader}
      />
    );
  }

  onEventChangeMainTrader(isVisibleButtonPlus, newValue, hasChange) {
    if (hasChange) {
      const { columnName, rowIndex } = this.props;
      this.props.onSaved(newValue, columnName, rowIndex);
      this.setState({
        suggestionMainTrader: newValue
      });
    }
    this.setState({
      isVisibleButtonPlus,
      isEditableMainTraderName: !isVisibleButtonPlus
    });
  }

  onDeletedMainTrader(modelItem) {
    this.setState({
      isVisibleButtonPlus: true,
      isEditableMainTraderName: false,
      suggestionMainTrader: {
        AssignmentId: -1,
        AssignmentNote: null,
        AssignmentType: modelItem.AssignmentType,
        Bettype: modelItem.Bettype,
        OWPMatchId: modelItem.OWPMatchId,
        MinorBettypeId: modelItem.MinorBettypeId,
        UserId: null,
        Username: null
      },
      listEditableTextMentions: []
    });
    const { columnName, rowIndex } = this.props;
    this.props.onDeleted(modelItem, columnName, rowIndex);
  }

  onEventChangeOtherTrader(assignmentItem, dataIndex, hasChange) {
    const { listEditableTextMentions } = this.state;
    if (listEditableTextMentions) {
      const indexs = [];
      for (let i = 0; i < listEditableTextMentions.length; i++) {
        if (!listEditableTextMentions[i].assignmentItem.AssignmentNote) {
          indexs.push(i);
        }
      }

      pullAt(listEditableTextMentions, indexs);
    }

    if (hasChange) {
      const { columnName, rowIndex } = this.props;
      if (
        assignmentItem &&
        assignmentItem.AssignmentId > 0 &&
        assignmentItem.AssignmentNote
      ) {
        listEditableTextMentions[dataIndex] = {
          assignmentItem,
          dataIndex,
          isEditing: false
        };
        this.props.onSaved(assignmentItem, columnName, rowIndex);
      } else {
        listEditableTextMentions.splice(dataIndex, 1);
      }
    }

    this.setState({
      isVisibleButtonPlus: true,
      listEditableTextMentions
    });
  }

  onDeletedOtherTrader(assignmentItem, dataIndex) {
    const { listEditableTextMentions } = this.state;
    const { columnName, rowIndex } = this.props;
    const indexs = [dataIndex];
    for (let i = 0; i < listEditableTextMentions.length; i++) {
      if (!listEditableTextMentions[i].assignmentItem.AssignmentNote) {
        indexs.push(i);
      }
    }

    pullAt(listEditableTextMentions, indexs);

    this.props.onDeleted(assignmentItem, columnName, rowIndex);
    this.setState({
      isVisibleButtonPlus: true,
      listEditableTextMentions
    });
  }

  onClickButtonPlus() {
    const {
      listEditableTextMentions,
      suggestionMainTrader,
      matchId
    } = this.state;
    if (!suggestionMainTrader.UserId) {
      this.setState({
        isEditableMainTraderName: true,
        isVisibleButtonPlus: false
      });
    } else {
      listEditableTextMentions.push({
        isEditing: true,
        dataIndex: listEditableTextMentions.length + 1,
        assignmentItem: {
          OWPMatchId: suggestionMainTrader.OWPMatchId || matchId,
          Bettype: suggestionMainTrader.Bettype,
          MinorBettypeId: suggestionMainTrader.MinorBettypeId
        }
      });
      this.setState({
        listEditableTextMentions,
        isVisibleButtonPlus: false
      });
    }
  }

  handleLinkClick = (event, url) => {
    event.preventDefault();
    window.open(url, '_blank');
  };

  render() {
    const {
      isEditableMainTraderName,
      suggestionMainTrader,
      isVisibleButtonPlus,
      listEditableTextMentions,
      policy,
      isAllowAdd,
      betType
    } = this.state;
    const { matchId, index } = this.props;
    const hasMentions = listEditableTextMentions.length > 0;
    const displayListEditableMention = listEditableTextMentions.map(
      this.mapEditableTextMention
    );
    const classNameCss = 'assignment ' + index;
    return (
      <div className={classNameCss}>
        <EditableTextSuggestion
          key={uuidv4()}
          betType={betType}
          policy={policy}
          matchId={matchId}
          assignmentItem={suggestionMainTrader}
          isEditableTextSuggest={isEditableMainTraderName}
          onEventChange={this.onEventChangeMainTrader}
          onDeleted={this.onDeletedMainTrader}
        />
        {hasMentions && (
          <div className='list-edit-mentions'>{displayListEditableMention}</div>
        )}
        {isAllowAdd && (
          <div className='button-plus'>
            <button
              className='btn-add'
              onClick={this.onClickButtonPlus}
              disabled={!isVisibleButtonPlus}>
              <PlusCircleIcon size={15} />
            </button>
          </div>
        )}
        {isAllowAdd &&
          BetTypeSuggestion.some(x => x === this.props.columnName) && (
            <div className='button-suggestion'>
              <a
                onClick={event =>
                  this.handleLinkClick(
                    event,
                    // eslint-disable-next-line no-warning-comments
                    // eslint-disable-next-line react/prop-types
                    `AssigneeSuggestionList?owpMatchId=${matchId}&betTypeId=${betType}&filterDate=${this.props.filterDate}`
                  )
                }
                className='btn-suggestion'>
                <QuestionMarkCircleIcon size={14}></QuestionMarkCircleIcon>
              </a>
            </div>
          )}
      </div>
    );
  }
}
EditableButtonGroup.propTypes = propTypes;
EditableButtonGroup.defaultProps = {
  policy: { HasRead: true, HasWrite: false },
  isAllowAdd: true,
  main: {},
  others: [],
  matchId: null,
  data: {},
  rowIndex: null,
  index: 'EditableButtonGroup_Key',
  betType: null,
  onSaved: f => f,
  onDeleted: f => f
};
const mapStateToProps = state => ({
  filterDate: state.tableReducer.filterDate
});

export default connect(mapStateToProps)(EditableButtonGroup);
