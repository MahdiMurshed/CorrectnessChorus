import { Container } from '@mantine/core';
import React from 'react';

const ContainerWrapper = ({ children }: React.PropsWithChildren) => {
  return <Container py="lg">{children}</Container>;
};

export default ContainerWrapper;
