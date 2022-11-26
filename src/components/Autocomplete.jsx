import { useState, useRef, useContext, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Loader,
  Paper,
  Select,
  Switch,
  createStyles,
  Text,
} from "@mantine/core";
import { usePet } from "./PetContext";
import { FaCat, FaDog } from "react-icons/fa";
import { Link, redirect, useNavigate } from "react-router-dom";

const useStyles = createStyles((themes) => ({
  description: {
    color: themes.white,
  },
  descriptionPetSearch: {
    display: "none",
  },
  breedSearchWrapper: {
    backgroundColor: "rgba(12, 12, 12, 0.6)",
    padding: "2rem",
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
  },
  input: {
    color: themes.colors.gray[4],
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  inputPetSearch: {
    color: themes.black,
    fontWeight: 500,
    fontSize: "1.5rem",
  },
}));

export function AutocompleteLoading({ page }) {
  const { classes } = useStyles();
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [petType, setPetType] = useState("");
  const { cat, dog } = usePet();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const handleChange = (val) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
  };

  useEffect(() => {
    setValue("");
  }, [petType]);

  useEffect(() => {
    if (cat.loading || dog.loading || !dog.data || !cat.data) {
      return setLoading(true);
    }
    let breeds = petType === "cat" ? cat.breeds : dog.breeds;
    if (value.trim().length === 0) {
      setLoading(false);
      setSuggestions(breeds);
    } else {
      setLoading(true);
      setSuggestions(breeds);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        /*breeds.length &&
          setSuggestions(
            breeds.reduce((matchedNames, name) => {
              if (name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                matchedNames.push(name);
              }
              return matchedNames;
            }, [])
          ); */
      }, 250);
    }
  }, [petType, value, cat, dog]);
  console.log(page);
  return (
    <Container>
      <Paper
        className={classes.breedSearchWrapper}
        style={{
          backgroundColor:
            page === "PetSearch" ? "transparent" : "rgba(12, 12, 12, 0.6)",
        }}
      >
        <Text
          className={
            page === "PetSearch"
              ? classes.descriptionPetSearch
              : classes.description
          }
          size="xl" /* mt="xl" */
        >
          Search adoptable pets from their breed.
        </Text>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            return navigate(
              `/Search/${petType}${
                suggestions.indexOf(value) > -1 ? `?breed=${value}` : ``
              }`
            );
          }}
        >
          <Select
            classNames={{
              label:
                page === "PetSearch" ? classes.inputPetSearch : classes.input,
            }}
            label="Pet type"
            placeholder="Pick one"
            value={petType}
            onChange={setPetType}
            data={[
              { value: "cat", label: "Cat" },
              { value: "dog", label: "Dog" },
            ]}
            /* sd */
          />
          <Select
            classNames={{
              label:
                page === "PetSearch" ? classes.inputPetSearch : classes.input,
            }}
            /* style={{ color: page === "PetSearch" ? "black" : null }} */
            value={value}
            data={suggestions}
            onChange={handleChange}
            searchable
            rightSection={
              dog.loading || cat.loading || !dog.data || !cat.data ? (
                <Loader size={16} />
              ) : null
            }
            rightSectionWidth={30}
            /* {suggestions.length && {error="Breed does not exist"}} */
            arialabel="Async Autocomplete data"
            placeholder="Your preferred breed"
            nothingFound={`${
              dog.loading || cat.loading || !dog.data || !cat.data
                ? "Loading suggestions..."
                : "No matching breeds"
            }`}
            label="Breed"
            disabled={!petType}
          />
          <Button variant="filled" color="orange" type="submit">
            Search
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

/* export function Pet() {
  return (

  );
} */
