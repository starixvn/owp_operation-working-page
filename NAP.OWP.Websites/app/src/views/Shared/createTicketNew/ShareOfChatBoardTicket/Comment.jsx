import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

const Comment = React.forwardRef((_, commentRef)=>{
  const [value, setValue]= useState();
  const [suggestion, setSuggestion] = useState();
  const [suggestionSource, setSuggestionSource] = useState();

const handleValueChange=event=>{
  const {target}= event;
  const suggest= suggestionSource.find(v=>v.shortcut===target.value);
  setSuggestion(suggest?.message);
  setValue(target.value);
};
 
const handleKeyDown=e=>{
  if (e.key === "Enter" && suggestion)
    {
      const newValue= value.replace(value, suggestion);
      setValue(newValue);
      event.preventDefault();
    }
};

  useEffect(()=>{
    (async ()=>{
  const response= await axios.get('api-netcore/AccountSetting/get-quick-message');
  setSuggestionSource(response.data);
  })();}, []);


  return (
    <div className='right-form'>
          {suggestion && <div className='suggestion__message'>
            <span>{suggestion}
            </span>
          </div>}
          <div className='box-textmessage'>
            <Input
              type='textarea'
              value={value}
              id='comment'
              innerRef={commentRef}
              name='message'
              className='input-field'
              maxLength='200'
              onChange={handleValueChange}
              multiple
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
  );
});

export default Comment;