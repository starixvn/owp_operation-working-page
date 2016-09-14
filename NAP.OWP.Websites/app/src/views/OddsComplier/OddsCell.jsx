import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NumericTextbox from 'react-numeric-textbox';
import { isNil } from 'lodash';
import { Input } from 'reactstrap';

const propTypes = {
  policy: PropTypes.object.isRequired,
  value: PropTypes.number,
  isValidate: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

class OddsCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur() {
    const { value, onChange } = this.props;
    const newValue = this.state.value;
    if (newValue === value) {
      return;
    }

    onChange(newValue);
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const { policy, value, isValidate } = this.props;
    const isInvalid = isValidate && isNil(value);
    const classNameCss = `input-field ${(value < 0 ? ' input-negative' : '')}${(isInvalid ? ' input-invalid' : '')}`;
    return (
      <div className='cell-input'>
        {policy.HasWrite ? (
          <NumericTextbox
            className={classNameCss}
            min={-1000}
            max={1000}
            decimals={2}
            autoCorrect
            value={value}
            format=''
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        ) : (
          <Input className={classNameCss} value={value || ''} disabled />
        )}
      </div>
    );
  }
}

OddsCell.propTypes = propTypes;
export default OddsCell;
