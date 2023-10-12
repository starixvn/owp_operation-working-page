import React from 'react';
import DropdownNative from '../../Shared/common/Dropdown/DropdownNative';
import { EXPORT } from './filterConst.json';

const ExportNative = () => {
  const handleExportAndCheckAll = () => {};

  const handleExport = () => {};

  const items = [
    {
      title: EXPORT.EXPORT_AND_CHECK_ALL,
      handler: handleExportAndCheckAll
    },
    {
      title: EXPORT.EXPORT_ONLY,
      handler: handleExport
    }
  ];
  return <DropdownNative items={items} />;
};

export default ExportNative;
