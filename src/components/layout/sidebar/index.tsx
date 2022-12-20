import { useMemo } from 'react';
import { Navbar, Group, Code, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import useStyles from './styles';
import { data } from './data';
import Link from 'next/link';

export default function SideBar() {
  const { classes, cx } = useStyles();

  const links = useMemo(
    () =>
      data.map((item) => (
        <Link
          className={cx(classes.link, {
            // [classes.linkActive]: item.label === active,
          })}
          href={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      )),
    [classes.link, classes.linkIcon, cx]
  );

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text size="xl" color="white">
            CorrectnessChorus
          </Text>
          <Code className={classes.version}>v1.0.0</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link
          href="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
