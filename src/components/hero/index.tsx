import image from './image.svg';
import useStyles from './styles';
import { useSession } from '@hooks/useUser';
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { signIn } from 'next-auth/react';

export function HeroBullets() {
  const [session] = useSession();
  const { classes } = useStyles();

  console.log({ session });

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Write with <span className={classes.highlight}>Confidence</span>
              and <span className={classes.highlight}>Accuracy</span>
            </Title>
            <Text color="dimmed" mt="md">
              Are you tired of making avoidable mistakes in your written work?
              Do you struggle with spelling, grammar, or punctuation?
              CorrectnessChorus is here to help! Our powerful app is designed to
              catch and correct errors, and to help you improve the overall
              quality of your writing.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="xl"
              icon={
                <ThemeIcon size={30} radius="xl" color="pink">
                  <IconCheck size={18} stroke={2.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                Check your spelling and grammar in real-time as you write
              </List.Item>

              <List.Item>
                Write with confidence and accuracy, no matter what {`you're`}{' '}
                working on
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="xl"
                color="pink"
                className={classes.control}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('google');
                }}
              >
                Login with google
              </Button>
            </Group>
          </div>
          <Image src={image.src} alt="" className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
