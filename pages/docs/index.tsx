// import LayOut from '@components/layout';

// import { NextPageWithLayout } from '../_app';
import Card from '@components/card';
import React from 'react';
import ContainerWrapper from 'src/container';

const Documents = () => {
  return (
    <ContainerWrapper>
      <Card title="New" description="Create new document" first />
    </ContainerWrapper>
  );
};

export default Documents;

// Documents.getLayout = function getLayout(page: React.ReactElement) {
//   return <LayOut>{page}</LayOut>;
// };
