import { Paper, Text, ThemeIcon } from '@mantine/core';
import { IconColorSwatch, IconPlus } from '@tabler/icons';
import useStyles from './styles';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';
import React from 'react';

interface CardGradientProps {
  first?: boolean;
  id?: string;
  title: string;
  description: string;
}

export default function Card({
  title,
  description,
  first,
  id,
}: CardGradientProps) {
  const { classes } = useStyles();
  const router = useRouter();

  const handleNewDoc = (e: any) => {
    e.preventDefault();
    //TODO: Get Document ID
    const id = uuid();
    router.push(`/docs/new/${id}`);
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/docs/${id}`);
  };

  return (
    <Paper
      withBorder
      radius="md"
      className={classes.card}
      onClick={first ? handleNewDoc : handleClick}
    >
      <ThemeIcon size="xl" radius="md" variant="filled" color="pink">
        {first ? (
          <IconPlus size={28} stroke={1.5} />
        ) : (
          <IconColorSwatch size={28} stroke={1.5} />
        )}
      </ThemeIcon>
      <Text size="xl" weight={700} mt="md">
        {title}
      </Text>
      <Text size="lg" mt="sm" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
}
