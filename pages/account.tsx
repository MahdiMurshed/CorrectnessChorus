import LayOut from '@components/layout';
import React from 'react';
import { NextPageWithLayout } from './_app';

const Account: NextPageWithLayout = () => {
  return <div>Account</div>;
};

export default Account;

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOut>{page}</LayOut>;
};
