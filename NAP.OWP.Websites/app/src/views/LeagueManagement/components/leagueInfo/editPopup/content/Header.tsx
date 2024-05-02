import React from 'react';
import { TDataSource } from '../../table/TableType';

interface Props {
  data: TDataSource;
}

const Header: React.FC<Props> = ({ data }) => {
  const { league } = data;

  return (
    <div className='header'>
      {league}
    </div>
  );
};

export default Header;