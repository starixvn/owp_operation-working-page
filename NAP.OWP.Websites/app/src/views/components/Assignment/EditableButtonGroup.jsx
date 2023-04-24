import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditableButtonBase from './EditableButtonBase';

class EditableButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const propsNew = {
      ...this.props,
      filterDate: this.props.filterDate
    };
    return <EditableButtonBase {...propsNew} />;
  }
}

const mapStateToProps = state => ({
  filterDate: state.tableReducer.filterDate
});

export default connect(mapStateToProps)(EditableButtonGroup);
