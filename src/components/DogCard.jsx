import { useState, useEffect } from "react";
import Loader from "./Loader";
import WithToolTip from "./ToolTip";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DogCard = ({
  dog,
  /*   dog: {
    id,
    url,
    breeds: [
      { name, bred_for, temperament, life_span, weight, height, origin },
    ],
  }, */
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [breedSubBreed, id] = new URL(dog).pathname
    .replace(/\/breeds\/|.jpg/gi, "")
    .split("/");
  const [breed, subbreed] = breedSubBreed.split("-");

  console.log(breed, subbreed, id);
  const renderCardFront = () => {
    return (
      <div className="card-front">
        {isLoading ? <Loader /> : null}
        <img
          style={isLoading ? { display: "none" } : null}
          className="image"
          src={dog}
          alt="dog img"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  };

  let introText = "Hi, I'm";
  if (subbreed) {
    if (subbreed.match(/^[aeiouAEIOU]/gm)) {
      introText += ` an ${capitalizeFirstLetter(subbreed)} `;
    } else {
      introText += ` a ${capitalizeFirstLetter(subbreed)} `;
    }
  } else {
    if (breed.match(/^[aeiouAEIOU]/gm)) {
      introText += " an ";
    } else {
      introText += " a ";
    }
  }
  introText += `${capitalizeFirstLetter(breed)}!`;

  const renderCardBack = () => {
    return (
      <div className="card-back">
        <h1>{introText}</h1>
        {/*         {origin ? <p>{`I am from ${origin}`}</p> : null}
               {temperament ? <p>{`I am ${temperament}.`}</p> : null}
        {bred_for ? <p>{`I am bred for: ${bred_for}.`}</p> : null}
        {life_span ? <p>{`My lifespan is between ${life_span}.`}</p> : null}
        {weight?.metric ? <p>{`I weigh between ${weight.metric}kg.`}</p> : null}
        {height?.metric ? (
          <p>{`I am between ${height.metric}cm tall.`}</p>
        ) : null} */}
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
};

export default DogCard;
