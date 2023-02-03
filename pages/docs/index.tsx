import Card from '@components/card';
import LayOut from '@components/layout';
import useDocs from '@hooks/useDocs';
import { useSession } from '@hooks/useUser';
import { Center, Col, Loader } from '@mantine/core';
import { Document } from '@prisma/client';
import React from 'react';
import ContainerWrapper from 'src/container';

const Documents = () => {
  const [session, loading] = useSession();
  const { docs } = useDocs(session?.user?.id);
  console.log({ docs });

  if (!session || loading) return <CenteredLoader />;
  return (
    <LayOut>
      <ContainerWrapper>
        <Col sm={6} md={4} lg={3}>
          <Card title="New" description="Create new document" first />
        </Col>

        {docs.map((doc: Document) => (
          <Col key={doc.id} sm={6} md={4} lg={3}>
            <Card title={doc.text} description={doc.answer} id={doc.id} />
          </Col>
        ))}
      </ContainerWrapper>
    </LayOut>
  );
};

export default Documents;

export function CenteredLoader() {
  return (
    <Center
      style={{
        height: '100vh',
      }}
    >
      <Loader variant="dots" />
    </Center>
  );
}
