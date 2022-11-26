import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie, IconHome } from "@tabler/icons";
import Lottie from "lottie-react";
import pets from "../images/82636-pets.json";

const mockdata = [
  {
    title: "What we do",
    description:
      "Our pet shelter exists to rescue and rehome abandoned pets to give them a second chance at life. Our facilities include an open field for play and activity, dedicated rooms, bedding and play toys for our furry friends.",
    icon: IconHome,
  },
  {
    title: "How to help",
    description:
      "Whether you want to adopt a pet or support us by donating to our pet shelter, there are plenty of ways to show you care.",
    icon: IconUser,
  },
  /*   {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconCookie, If you’re an animal lover with a great passion for our furry friends, there are plenty of ways you can participate and help give these beautiful creatures a chance to find their forever home. 
  }, */
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export default function Info() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <>
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} align="center" mt="sm">
          Singapore’s Volunteer-Run Pet Shelter
        </Title>

        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          We are dedicated to the welfare of Singapore’s abandoned cats and
          dogs.
        </Text>
        <Text
          color="dimmed"
          /* className={classes.description} */
          align="center"
          mt="md"
        ></Text>
        <Lottie animationData={pets} />
        <SimpleGrid
          cols={2}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}
