import React from 'react';
import SubTypeManagement from './SubTypeManagement';
import { fireEvent, render } from '@testing-library/react';

const subTypesDefault = [{ typeId: 1, subtypeId: 0, subtypeName: 'sa1' }];
const ticketTypeId = 1;
const props = {
  subTypesDefault,
  ticketTypeId
};

describe('SubTypeManagement under test', () => {
  it('should render', () => {
    const { container } = render(<SubTypeManagement {...props} />);
    const input = container.querySelector(`[class="subtype-text-input"]`);
    fireEvent.change(input!, { target: { value: '12345' } });
    fireEvent.focusOut(input!);
    const submit = container.querySelector(`[class="button button-add"]`);
    fireEvent.click(submit!);
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
