import { Button, Card, createStyles, Group, Image, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import WithToolTip from "./ToolTip";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* const PetCard = ({
  pet: {
    id,
    url,
    breeds: [
      { name, bred_for, temperament, life_span, weight, height, origin },
    ],
  },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  // const [breedSubBreed, id] = new URL(dog.url).pathname
  //  .replace(/\/breeds\/|.jpg/gi, "")
  //  .split("/");
  //const [breed, subbreed] = breedSubBreed.split("-");

  //console.log(breed, subbreed, id);
  const renderCardFront = () => {
    return (
      <div className="card-front">
        {isLoading ? <Loader /> : null}
        <img
          style={isLoading ? { display: "none" } : null}
          className="image"
          src={url}
          alt="pet img"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  };

  let introText = "Hi, I'm";
  if (name.match(/^[aeiou]/gi)) {
    introText += " an ";
  } else {
    introText += " a ";
  }
  introText += `${capitalizeFirstLetter(name)}!`;

  const renderCardBack = () => {
    return (
      <div className="card-back">
        <h1>{introText}</h1>
        {origin ? <p>{`I am from ${origin}`}</p> : null}
        {temperament ? <p>{`I am ${temperament}.`}</p> : null}
        {bred_for ? <p>{`I am bred for: ${bred_for}.`}</p> : null}
        {life_span ? <p>{`My lifespan is between ${life_span}.`}</p> : null}
        {weight?.metric ? <p>{`I weigh between ${weight.metric}kg.`}</p> : null}
        {height?.metric ? (
          <p>{`I am between ${height.metric}cm tall.`}</p>
        ) : null}
      </div>
    );
  };
  return (
    <WithToolTip
      toolTipText={`Click ${flipped ? "to see me!" : "to know me!"}`}
    >
      <div
        className={flipped ? "card flipped" : "card"}
        onClick={() => setFlipped(!flipped)}
        key={id}
      >
        <div className="card-content">
          {renderCardFront()}
          {renderCardBack()}
        </div>
      </div>
    </WithToolTip>
  );
}; */
const useStyles = createStyles((theme) => ({
  card: {
    /* height: 440, */
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "425px",
    width: "290px",
    textAlign: "center",
  },
  cardContent: {
    maxHeight: "200px",
  },
  cardTitle: {
    textAlign: "left",
  },
  breedName: {
    fontFamily: "Happy Monkey, cursive",
  },
  /*   cardText: {
    minHeight: "125px",
  }, */
}));

function PetCard({ pet }) {
  const {
    id,
    url,
    name: petName,
    breedInfo: {
      name,
      bred_for,
      temperament,
      life_span,
      weight,
      height,
      origin,
    },
    type,
  } = pet;

  const { classes } = useStyles();
  let introText = "Hello! I'm ";
  /* if (name.match(/^[aeiou]/gi)) {
    introText += " an ";
  } else {
    introText += " a ";
  } */
  /* introText +=  */ /* `${capitalizeFirstLetter( */ /* )}!` */
  console.log(pet);
  return (
    <Card
      /* shadow="sm" */ className={classes.card}
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={url} height={300} alt="Norway" />
      </Card.Section>
      <Group position="apart" mt="sm" mb="xs" className={classes.cardContent}>
        <Text className={classes.cardTitle} inline>
          {introText}
          <Text
            inline
            className={classes.breedName}
            size="lg"
            color="blue.8"
            weight={600}
            style={{ display: "inline" }}
          >{`${petName}`}</Text>
        </Text>
        {/*           <Badge color="pink" variant="light">
            On Sale
          </Badge> */}
      </Group>
      <Text size="sm" className={classes.cardText} color="dimmed">
        {/*      {/* <h1>{`${introText}`}</h1> */}
        {/*         {origin ? <p>{`I am from ${origin}`}</p> : null} */}
        {/*  {temperament ? <p>{`${temperament}.`}</p> : null} */}
        {/*      /*   {bred_for ? <p>{`I am bred for: ${bred_for}.`}</p> : null} */}
        {/*  {life_span ? <p>{`My lifespan is between ${life_span}.`}</p> : null} */}
        {/*  weight?.metric ? <p>{`I weigh between ${weight.metric}kg.`}</p> : null}
        {height?.metric ? (
          <p>{`I am between ${height.metric}cm tall.`}</p>
        ) : null} } */}
      </Text>

      <Button
        component={Link}
        to={{ pathname: `/AdoptForm/${id}` }}
        state={{ pet }}
        variant="light"
        color="orange"
        fullWidth
        mt="md"
        radius="md"
      >
        Adopt me
      </Button>
    </Card>
  );
}

export default PetCard;
