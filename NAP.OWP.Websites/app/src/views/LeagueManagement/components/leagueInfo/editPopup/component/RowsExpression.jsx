import PropTypes from 'prop-types';
import Expression from './Expression';
import Value from './Value';
import Action from './Action';
import MaxbetConst from '../../../../constants/MaxbetConst';

const RowsExpression = ({ items, title, actionType }) => {
  return (
    <div className='content'>
      <div className='label'>{title}</div>
      {items.map((item, index) => {
        const rowProps = {
          item,
          index,
          actionType,
          modelsLength: items.length,
          modelExpressionDefault: {
            round: {
              expression: MaxbetConst.expressionOption[0],
              value: ''
            }
          }
        };

        return (
          <div className='item' key={item.key}>
            <Expression {...rowProps} />
            <Value {...rowProps} />
            <Action {...rowProps} />
          </div>
        );
      })}
    </div>
  );
};

RowsExpression.propTypes = {
  items: PropTypes.array.isRequired,
  actionType: PropTypes.object,
  title: PropTypes.string.isRequired
};

export default RowsExpression;
