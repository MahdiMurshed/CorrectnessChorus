import LayOut from '@components/layout';
import React from 'react';
import { NextPageWithLayout } from './_app';

const Documents: NextPageWithLayout = () => {
  return <div>Documents</div>;
};

export default Documents;

Documents.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOut>{page}</LayOut>;
};
