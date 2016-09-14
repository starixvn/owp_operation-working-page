import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SubTypeRow from './SubTypeRow';

const onUpdateSubType = jest.fn();

describe('SubTypeRow under test', () => {
  it('should render SubTypeRow', () => {
    const index = 0;
    const subtypeName = 'sa';
    const props = {
      subtypeName,
      index,
      onUpdateSubType
    };
    const { container } = render(
      <SubTypeRow subtypeId={23} typeId={1} {...props} />
    );
    const input = container.querySelector(`[class="subtype-text-input"]`);
    const divElement = container.querySelector(`[class="control-subtype"]`);
    fireEvent.change(input!, { target: { value: '12345' } });
    fireEvent.focusOut(input!);
    expect(input!).toBeInTheDocument();
    expect(divElement!).toBeInTheDocument();
    fireEvent.change(input!, { target: { value: '' } });
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(onUpdateSubType).toBeCalled();
  });
});
