import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

const Comment = React.forwardRef((_, commentRef)=>{
  const [value, setValue]= useState();
  const [suggestion, setSuggestion] = useState();
  const [suggestionSource, setSuggestionSource] = useState();
  const [begin, setBegin] = useState();
  const [end, setEnd] = useState();

const handleValueChange=event=>{
  const {target}= event;
  const {selectionStart, selectionEnd}= target;
  const startIndex = selectionStart;
  const endIndex = selectionEnd;
  const previousSpaceIndex = target.value.lastIndexOf("/", startIndex - 1);
  const nextSpaceIndex = target.value.indexOf(" ", endIndex );
  const begin = previousSpaceIndex < 0 ? 0 : previousSpaceIndex + 1;
  const end = nextSpaceIndex < 0 ? target.value.length : nextSpaceIndex;
  const stringTarget = "/"+target.value.substring(begin, end);
  const suggest= suggestionSource.find(v=>v.shortcut===stringTarget);
  setBegin(begin);
  setEnd(end);
  setSuggestion(suggest?.message);
  setValue(target.value);
};
 
const handleKeyDown=e=>{
  if (e.key === "Enter" && suggestion)
    {
      const newValue= value.substring(0, begin-1) + suggestion + value.substring(end);
      setSuggestion();
      setValue(newValue);
      e.preventDefault();
    }
};

  useEffect(()=>{
    (async ()=>{
  const response= await axios.get('api-netcore/AccountSetting/QuickMessage/get-quick-message');
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