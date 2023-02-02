import SideBar from './sidebar';
import React from 'react';

const LayOut = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <SideBar />

      <main>{children}</main>
    </div>
  );
};

export default LayOut;
