import React, { useEffect } from 'react';
import { OWPHeader, OWPPage, OWPBody } from '../Shared/common/OWP/OPWPage';
import Header from './features/header/Header';
import ColorExplain from './features/colorExplain/ColorExplain';
import SuggestionTable from './features/table/SuggestionTable';
import { shallow } from 'zustand/shallow';
import useStore from './app/useStore';

const AssigneeSuggestionList = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const matchId = searchParams.get('owpMatchId');
  const betTypeId = searchParams.get('betTypeId');
  const filterDate = searchParams.get('filterDate');
  const { queryDataTable } = useStore(
    state => ({
      queryDataTable: state.queryDataTable
    }),
    shallow
  );

  useEffect(() => {
    matchId &&
      betTypeId &&
      filterDate &&
      queryDataTable({ matchId, betTypeId, filterDate });
  }, []);

  return (
    <OWPPage className='suggestion-list'>
      <OWPHeader className='suggestion-list'>
        <Header />
        <ColorExplain />
      </OWPHeader>
      <OWPBody className='suggestion-list'>
        <SuggestionTable></SuggestionTable>
      </OWPBody>
    </OWPPage>
  );
};

export default AssigneeSuggestionList;
