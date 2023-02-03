import { NextPageWithLayout } from './_app';
import LayOut from '@components/layout';
import { useSession } from '@hooks/useUser';
import React from 'react';

const Account: NextPageWithLayout = () => {
  const [session] = useSession();
  return (
    <div
      style={{
        margin: '0px auto',
      }}
    >
      {session?.user?.name}
    </div>
  );
};

export default Account;

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOut>{page}</LayOut>;
};
