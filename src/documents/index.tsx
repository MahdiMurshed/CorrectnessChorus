// import LayOut from '@components/layout';

// import { NextPageWithLayout } from '../_app';

import ContainerWrapper from '../container';
import Card from '@components/card';
import React from 'react';

export function DocIndex() {
  return (
    <ContainerWrapper>
      <Card title="New" description="Create new document" first />
    </ContainerWrapper>
  );
}

// Documents.getLayout = function getLayout(page: React.ReactElement) {
//   return <LayOut>{page}</LayOut>;
// };
