import React from "react";
import Resource from "./Resource";
import DogCard from "./DogCard";
import Loader from "./Loader";
import PaginatedItems from "./Pagination";

const Showdog = () => {
  const webURL = "https://dog.ceo/api/breeds/image/random/40";

  /*   const [isVisible, setIsVisible] = useState(false); */
  const render = (data) => {
    if (data.loading)
      return (
        <PaginatedItems
          items={Array(40).fill(
            <div className="wrapper">
              <Loader />
            </div>
          )}
          itemsPerPage={8}
        />
      );
    return (
      <PaginatedItems
        items={data.trans.map((dog) => (
          <div className="wrapper">
            <DogCard key={dog} dog={dog} />
          </div>
        ))}
        itemsPerPage={8}
      />
    );
  };

  return (
    <div>
      <Resource path={webURL} render={render} />
    </div>
  );
};

export default Showdog;
