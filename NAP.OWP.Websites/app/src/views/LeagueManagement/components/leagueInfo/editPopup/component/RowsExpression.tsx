import React from 'react';
import MaxbetConst from '../../../../constants/MaxbetConst';
import { TEditSetting, TExpression } from '../EditType';
import Action from './Action';
import Expression from './Expression';
import Value from './Value';

interface RowExpressionProps {
  items: TExpression[];
  title?: string;
  inputKey: keyof TEditSetting;
  updateSetting: Function;
}

const RowsExpression: React.FC<RowExpressionProps> = ({ items, title, inputKey }) => {
  return (
    <div className='content'>
      {title && <div className='left'>{title}</div>}
      <div className='right'>
        {items.map((item, index) => {
          const rowProps = {
            item,
            index,
            inputKey,
            modelsLength: items.length,
            modelExpressionDefault: {
              round: {
                expression: MaxbetConst.expressionOption[0],
                value: ''
              }
            },
            hasWrite: true
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
    </div>
  );
};

export default RowsExpression;
