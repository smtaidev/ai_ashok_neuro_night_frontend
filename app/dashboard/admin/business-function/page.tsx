import React from 'react';
import BusinessManagementTopPage from './component/BusinessManagementTop';
import BusinessFunctionTablePage from '../organization/_components/BusinessFunctionTable';

const BusinessFunctionPage = () => {
  return (
    <div>
      <BusinessManagementTopPage />
      <BusinessFunctionTablePage />
    </div>
  );
};

export default BusinessFunctionPage;