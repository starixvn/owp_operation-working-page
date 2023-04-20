import React, { useEffect } from 'react';
import { OWPHeader, OWPPage, OWPBody } from '../Shared/common/OWP/OPWPage';
import Header from './features/header/Header';
import ColorExplain from './features/colorExplain/ColorExplain';
import SuggestionTable from './features/table/SuggestionTable';
import { shallow } from 'zustand/shallow';
import useStore from './app/useStore';
import { isEqual } from 'lodash';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';

const AssigneeSuggestionList = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const matchId = searchParams.get('owpMatchId');
  const betTypeId = searchParams.get('betTypeId');
  const filterDate = searchParams.get('filterDate');
  const { queryDataTable, loading } = useStore(
    state => ({
      queryDataTable: state.queryDataTable,
      loading: state.loadingDataTable
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
        {isEqual(loading, REQUEST_STATUS.pending) ? (
          <Loading />
        ) : (
          <SuggestionTable></SuggestionTable>
        )}
      </OWPBody>
    </OWPPage>
  );
};

export default AssigneeSuggestionList;
