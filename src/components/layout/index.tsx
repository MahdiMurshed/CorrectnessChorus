import React from 'react';
import SideBar from './sidebar';

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
