import { NextPageWithLayout } from './_app';
import LayOut from '@components/layout';
import React from 'react';

const Account: NextPageWithLayout = () => {
  return <div>Account</div>;
};

export default Account;

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOut>{page}</LayOut>;
};
