import LayOut from '@components/layout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Trash: NextPageWithLayout = () => {
  return <div>Trash</div>;
};

export default Trash;

Trash.getLayout = function getLayout(page: ReactElement) {
  return <LayOut>{page}</LayOut>;
};
