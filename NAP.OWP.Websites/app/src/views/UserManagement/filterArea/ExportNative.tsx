import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

const ExportButton: React.FC = () => {
  const handleExport = async () => {
    const urlExport =
      process.env.NODE_ENV === 'development'
        ? `api-netcore/UserManagement/export-excel`
        : `${window.netCoreRootUrl}/api/UserManagement/export-excel`;
    const user = 'sa';
    const roleId = '1';
    const sectionId = '3';
    const url = `${urlExport}?User=${user}&RoleId=${roleId}&SectionId=${sectionId}`;

    let instance = axios.create({
      baseURL: '/'
    });

    let options = {
      url,
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      responseType: 'blob' as const
    };
    const response: AxiosResponse<Blob> = await instance.request(options);
    let filename = response.headers?.['content-disposition']
      ?.split(';')
      ?.find(n => n.includes('filename='))
      ?.replace('filename=', '')
      ?.trim();
    let fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    saveAs(fileUrl, filename);
  };

  return <button onClick={handleExport}>Export Data</button>;
};

export default ExportButton;
