import React, { createRef } from 'react';
import { AssignmentInfo } from '../type/TableType';
import ContactInfo from './ContactInfo';

const Assignment = (props: { assignment: AssignmentInfo[] }) => {
  return (
    <>
      {props.assignment.map(x => {
        const ref = createRef<HTMLAnchorElement>();
        return !x.IsCurrentUser && x.IsHasContactInfo ? (
          <span key={`contact-${x.UserId}`} className='assignee'>
            <a ref={ref} className='dropdown-button js-traderName'>
              {x.Username}
            </a>
            <ContactInfo target={ref} assignment={x} />
          </span>
        ) : (
          <span
            key={`trader-${x.UserId}`}
            className={`${
              x.IsCurrentUser ? 'badge-label my-assign' : 'assignee'
            }  `}>
            {x.Username}
          </span>
        );
      })}
    </>
  );
};

export default Assignment;
