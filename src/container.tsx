import { Grid } from '@mantine/core';
import React from 'react';

const ContainerWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
