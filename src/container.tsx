import { Grid } from '@mantine/core';
import React from 'react';

const ContainerWrapper = ({ children }: React.PropsWithChildren) => {
  return <Grid py="lg">{children}</Grid>;
};

export default ContainerWrapper;
