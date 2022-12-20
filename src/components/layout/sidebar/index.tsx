import { useState, useMemo } from 'react';
import { Navbar, Group, Code } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import useStyles from './styles';
import { data } from './data';
import Link from 'next/link';

export function NavbarSimpleColored() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const links = useMemo(
    () =>
      data.map((item) => (
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          href={item.link}
          key={item.label}
          onClick={() => {
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      )),
    [active, classes.link, classes.linkActive, classes.linkIcon, cx]
  );

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          CorrectChorus
          <Code className={classes.version}>v3.1.2</Code>
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
