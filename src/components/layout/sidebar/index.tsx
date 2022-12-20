import { useMemo } from 'react';
import { Navbar, Group, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import useStyles from './styles';
import { data } from './data';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideBar() {
  const { classes, cx } = useStyles();
  const router = useRouter();

  const links = useMemo(
    () =>
      data.map((item) => (
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: router.pathname.includes(item.link),
          })}
          href={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      )),
    [classes.link, classes.linkActive, classes.linkIcon, cx, router.pathname]
  );

  return (
    <Navbar
      height="100vh"
      width={{ sm: 350 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text
            size="xl"
            color="white"
            className={classes.logo}
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            CorrectnessChorus
          </Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link href="/sign-in" className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
