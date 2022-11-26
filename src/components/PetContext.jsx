import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import React, { useState, createContext, useEffect, useContext } from "react";

import { reactLocalStorage } from "reactjs-localstorage";
import { db } from "../firebase";
import useFetch from "./useFetch";

let initialCatInfo = {
  breeds: [],
  cats: [],
};

let initialDogInfo = {
  breeds: [],
  dogs: [],
};

export const PetContext = createContext({});

export const usePet = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const dog = useFetch("dogs");
  if (dog.data) {
    dog.breeds = [
      ...new Set(
        dog.data.reduce((filtered, dog) => {
          if (dog?.breedInfo?.name) {
            filtered.push(dog.breedInfo.name);
          }
          return filtered;
        }, [])
      ),
    ];
  }

  const cat = useFetch("cats");

  if (cat.data) {
    cat.breeds = [
      ...new Set(
        cat.data.reduce((filtered, cat) => {
          if (cat?.breedInfo?.name) {
            filtered.push(cat.breedInfo.name);
          }
          return filtered;
        }, [])
      ),
    ];
  }

  /* if (dog.data && cat.data) {
    const batch = writeBatch(db);
    dog.data.forEach((dog) => {
      const petRef = doc(collection(db, "dogs"));
      const { breeds, ...dogInfo } = dog;
      const breedInfo = breedInfo;
      batch.set(petRef, { ...dogInfo, breedInfo });
    });
    cat.data.forEach((cat) => {
      const petRef = doc(collection(db, "cats"));
      const { breeds, ...catInfo } = cat;
      const breedInfo = breedInfo;
      batch.set(petRef, { ...catInfo, breedInfo });
    });
    batch.commit();
  } */
  console.log(dog, cat);

  return (
    <PetContext.Provider
      value={{
        dog,
        cat,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
