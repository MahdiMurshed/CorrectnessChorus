import LayOut from '@components/layout';
import React from 'react';
import { NextPageWithLayout } from '../_app';
import Card from '@components/card';
import ContainerWrapper from 'src/container';

const Documents: NextPageWithLayout = () => {
  return (
    <ContainerWrapper>
      <Card title="New" description="Create new document" first />
    </ContainerWrapper>
  );
};

export default Documents;

Documents.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOut>{page}</LayOut>;
};
