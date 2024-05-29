import axios from "axios";
import { useEffect, useState } from "react";

const useQueryMessageSuggestion = () => {
  const [suggestionSource, setSuggestionSource] = useState<Array<{
    shortcut: string,
    message: string
  }>>([]);
  
  useEffect(()=>{
    (async ()=>{
  const response= await axios.get('api-netcore/AccountSetting/QuickMessage/get-quick-message');
  setSuggestionSource(response.data);
  })();}, []);

  return suggestionSource;
};

export default useQueryMessageSuggestion;