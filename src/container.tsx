import React from 'react';
import { Container } from '@mantine/core';

const ContainerWrapper = ({ children }: React.PropsWithChildren) => {
  return <Container py="lg">{children}</Container>;
};

export default ContainerWrapper;
