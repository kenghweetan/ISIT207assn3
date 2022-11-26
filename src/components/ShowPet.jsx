import React, { useContext } from "react";
import PetCard from "./PetCard";
import Loader from "./Loader";
import PaginatedItems from "./Pagination";
import { PetContext, usePet } from "./PetContext";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Title } from "@mantine/core";
import { AutocompleteLoading } from "./Autocomplete";

const ShowPet = ({ petType }) => {
  const petContext = usePet();
  let [searchParams, setSearchParams] = useSearchParams();
  let breed = searchParams.get("breed");
  console.log(breed);
  console.log(petType);
  let pets =
    petType /* ?.toLowerCase() */ === "cat" ? petContext.cat : petContext.dog;
  let filteredPets =
    searchParams.get("breed") && pets.data
      ? pets.data.filter((pet) => {
          console.log(pet.breedInfo.name);
          return pet.breedInfo.name === breed;
        })
      : pets.data;
  return (
    <div>
      <Title>Our Pets</Title>
      <AutocompleteLoading page={"PetSearch"} />
      {!pets.data || pets.loading ? (
        <PaginatedItems
          items={Array(12).fill(
            <div className="wrapper">
              <Skeleton height={475} width={300} radius="md" />
            </div>
          )}
          itemsPerPage={6}
        />
      ) : (
        <PaginatedItems
          items={filteredPets.map((pet) => {
            console.log(pet);
            return (
              <div className="wrapper">
                <PetCard key={pet.id} pet={pet} />
              </div>
            );
          })}
          itemsPerPage={6}
        />
      )}
    </div>
  );
};

export default ShowPet;
