import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Card,
  Image,
  Badge,
  Group,
  Container,
  Skeleton,
} from "@mantine/core";
import { PetContext } from "./PetContext";
import { useContext } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import PetCard from "./PetCard";

const useStyles = createStyles((theme) => ({
  card: {
    /* height: 440, */
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  section: {
    /* display: "flex",
    flexDirection: "column",
    alignItems: "center", */
    textAlign: "center",
    maxWidth: "960px",
  },

  /* title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  }, */

  title: {
    marginTop: "40px",
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
    marginTop: "16px",
    marginBottom: "16px",
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

  cardTitle: {
    fontFamily: "Happy Monkey, cursive",
  },
  cardText: {
    height: "75px",
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

/* function Demo() {
  return (

  );
} */

function CarouselCard({ image, title, category }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

export function CardsCarousel({ type }) {
  const { classes } = useStyles();
  const { dog, cat } = useContext(PetContext);
  const dogSlides =
    !dog.data || dog.loading
      ? Array(12).fill(
          <Carousel.Slide>
            <Skeleton height={475} width={290} radius="md" />
          </Carousel.Slide>
        )
      : dog.data.map((pet) => {
          const slicedURL = "";
          console.log(pet);

          return (
            <Carousel.Slide key={pet.id}>
              <PetCard key={pet.id} pet={{ ...pet, type: "dog" }} />
            </Carousel.Slide>
          );
        });
  const catSlides =
    !cat.data || cat.loading
      ? Array(12).fill(
          <Carousel.Slide>
            <Skeleton height={475} width={290} radius="md" />
          </Carousel.Slide>
        )
      : cat.data.map((pet) => {
          const slicedURL = "";
          console.log(pet);

          return (
            <Carousel.Slide key={pet.id}>
              <PetCard key={pet.id} pet={{ ...pet, type: "cat" }} />
            </Carousel.Slide>
          );
        });
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  /*   const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <PetCard {...item} />
    </Carousel.Slide>
  )); */

  return (
    <Container className={classes.section}>
      <Title className={classes.title}>Adopt us!</Title>
      <Text color="dimmed" className={classes.description}>
        Adorable adoptables near you!
      </Text>
      <Carousel
        slideSize="33.333333%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="xl"
        align="start"
        loop
        slidesToScroll={mobile ? 1 : 3}
      >
        {dogSlides}
      </Carousel>
      <Carousel
        slideSize="33.333333%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="xl"
        align="start"
        loop
        slidesToScroll={mobile ? 1 : 3}
        style={{ marginTop: "20px" }}
      >
        {catSlides}
      </Carousel>
    </Container>
  );
}
