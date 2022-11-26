import {
  Container,
  Image,
  Radio,
  Title,
  Textarea,
  Button,
  Group,
  Checkbox,
  TextInput,
  Stepper,
  List,
  Divider,
  Modal,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addDoc, collection } from "firebase/firestore";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "emailjs-com";
import {
  useSearchParams,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { db } from "../firebase";
import { NotFoundTitle } from "./ErrorPage";
import { usePet } from "./PetContext";

export const AdoptForm = () => {
  const [searchParams] = useSearchParams();
  const store = usePet();
  const navigate = useNavigate();
  let { id, type } = useParams();
  let location = useLocation();
  const [opened, setOpened] = useState(false);
  console.log(location.state);
  console.log(id, type);
  const [pet, setPet] = useState(location.state.pet);
  /* if (!pet) return <></>; */
  /*   useEffect(() => {
    if (store[type].loading || !store[type].data) return;
    setPet(store[type].data.find((pet) => pet.id === id));
  }, [store[type].loading, store[type].data]);
  console.log(pet);
  console.log(pet?.breeds); */

  return pet ? (
    <Container
      style={{
        backgroundColor: "rgb(245,245,245)",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Paper shadow="xs" p="md">
          <Image src={pet.url} radius="sm" height={300} width={300} />
        </Paper>
        <Divider orientation="vertical" />
        <Container style={{ width: "100%" }}>
          <Paper shadow="xs" p="md" mb="md" style={{ width: "100%" }}>
            <Title color="blue.7">{`Hi, I am ${pet.name}!`}</Title>
          </Paper>
          <Paper style={{ width: "100%" }} shadow="xs" p="md">
            <Title>How to adopt me</Title>
            <List type="ordered">
              <List.Item>Submit application</List.Item>
              <List.Item>Interview</List.Item>
              <List.Item>Meet me</List.Item>
              <List.Item>Pay fee</List.Item>
              <List.Item>Sign adoption contract</List.Item>
            </List>
            <Button
              onClick={() => {
                setOpened(true);
              }}
              color="orange"
            >
              Adopt me
            </Button>
          </Paper>
        </Container>
      </Container>
      <Divider orientation="horizontal" />
      <Container
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <Paper shadow="xs" p="md" style={{ width: "100%" }}>
          <Title>Facts about my breed</Title>
          {/* {pet?.breedInfo?.origin ? (
        <p>{`I am from ${pet?.breedInfo?.origin}`}</p>
      ) : null} */}
          {pet.breedInfo.temperament ? (
            <p>{`I am ${pet?.breedInfo?.temperament}.`}</p>
          ) : null}
          {pet.breedInfo.life_span ? (
            <p>{`My lifespan is between ${pet.breedInfo.life_span} years.`}</p>
          ) : null}
          {pet.breedInfo.weight?.metric ? (
            <p>{`I can weigh between ${pet.breedInfo.weight.metric}kg.`}</p>
          ) : null}
          {pet.breedInfo.height?.metric ? (
            <p>{`I am between ${pet.breedInfo.height.metric}cm tall.`}</p>
          ) : null}
        </Paper>
        {/*       <Divider orientation="vertical" /> */}
      </Container>
      <PetAdoptForm opened={opened} setOpened={setOpened} />
    </Container>
  ) : (
    <NotFoundTitle />
  );
};

const PetAdoptForm = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      address: "",
      postalCode: "",
      childrenPresent: "",
      numOfChildren: 0,
      ageGroups: [],
      homeType: "",
      outdoorSpace: "",
      otherPetsPresent: "",
      otherPetsTypes: [],
      activityLevel: "",
      dailyPetExercise: "",
      petAloneHours: "",
      adoptReason: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          firstName: !values.firstName
            ? "Please fill in your first name."
            : null,
          lastName: !values.lastName ? "Please fill in your last name." : null,
          email: !values.email
            ? "Please fill in your email."
            : !/^\S+@\S+$/.test(values.email)
            ? "Invalid email."
            : null,
          phoneNum: !values.phoneNum
            ? "Please fill in your phone number."
            : null,
          address: !values.address ? "Please fill in your address" : null,
          postalCode: !values.postalCode
            ? "Please fill in your postal code"
            : null,
        };
      }

      if (active === 1) {
        return {
          childrenPresent: !values.childrenPresent
            ? "Please indicate if there are children in your household."
            : null,
          numOfChildren:
            values.childrenPresent === "yes" && values.numOfChildren === 0
              ? "Please state the number of children in your household."
              : null,
          ageGroups:
            values.childrenPresent === "yes" &&
            values.numOfChildren > 0 &&
            values.ageGroups.length === 0
              ? "Please indicate the age groups of the children in your household."
              : values.numOfChildren < values.ageGroups.length
              ? "Number of age groups cannot be greater than the number of children"
              : null,
          homeType: !values.homeType
            ? "Please indicate your type of home."
            : null,
          outdoorSpace: !values.outdoorSpace
            ? "Please indicate if you have an outdoor space outside your home."
            : null,
        };
      }

      if (active === 2) {
        return {
          otherPetsPresent: !values.otherPetsPresent
            ? "Please indicate your type of home."
            : null,
          otherPetsTypes:
            values.otherPetsPresent === "yes" &&
            values.otherPetsTypes.length === 0
              ? "Please indicate your other pet type(s)."
              : null,
        };
      }

      if (active === 3) {
        return {
          activityLevel: !values.activityLevel
            ? "Please indicate your type of home."
            : null,
          dailyPetExercise: !values.dailyPetExercise
            ? "Please indicate if you can provide daily exercise or daycare for your pet."
            : null,
          petAloneHours: !values.petAloneHours
            ? "Please indicate the number of hours your pet may be left alone daily."
            : null,
          adoptReason: !values.adoptReason
            ? "Please tell us your reasons for adoption"
            : null,
        };
      }

      return {};
    },
  });

  useEffect(() => {
    if (form.getInputProps("childrenPresent").value === "no") {
      form.setValues({ numOfChildren: 0, ageGroups: [] });
    }
  }, [form.getInputProps("childrenPresent").value]);

  useEffect(() => {
    if (form.getInputProps("childrenPresent").value === "no") {
      form.setValues({ otherPetsTypes: [] });
    }
  }, [form.getInputProps("otherPetsPresent").value]);

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size="75%">
      <form
        onSubmit={form.onSubmit(
          async (values, _event) => {
            _event.preventDefault();
            showNotification({
              id: "load-data",
              loading: true,
              title: "Submitting your application",
              message: "Please wait...",
              autoClose: false,
              disallowClose: true,
            });
            const adoptCol = collection(db, "adoptionApplications");
            try {
              setAllowSubmit(true);
              await addDoc(adoptCol, values);
              await emailjs.send(
                "service_79te5fr",
                "template_q7vzo93",
                { ...values },
                "3_aLZ1Ewod1hxomsu"
              );
              /* navigate("/"); */
              updateNotification({
                id: "load-data",
                color: "teal",
                title: "Adoption application submitted",
                message: "This notification will close in 2 seconds.",
                icon: <IconCheck size={16} />,
                autoClose: 2000,
                onClose: () => {
                  setOpened(false);
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                },
              });
            } catch {
              showNotification({
                id: "hello-there",
                disallowClose: true,
                onClose: () => console.log("unmounted"),
                onOpen: () => console.log("mounted"),
                autoClose: 5000,
                title: "You've been compromised",
                message: "Leave the building immediately",
                color: "red",
                icon: <IconX />,
                className: "my-notification-class",
                style: { backgroundColor: "red" },
                sx: { backgroundColor: "red" },
                loading: false,
              });
            }
            /* form.reset(); */
          },
          (validationErrors, _values, _event) => {
            console.log(validationErrors);
          }
        )}
      >
        <Stepper active={active} /*  onStepClick={setActive} */ breakpoint="sm">
          <Stepper.Step label="About You" /* description="Create an account" */>
            <TextInput
              placeholder="Your first name"
              size="md"
              label="First name"
              withAsterisk
              {...form.getInputProps("firstName")}
            />
            <TextInput
              placeholder="Your last name"
              size="md"
              label="Last name"
              withAsterisk
              {...form.getInputProps("lastName")}
            />
            <TextInput
              placeholder="Your email"
              size="md"
              label="Email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Your phone number"
              size="md"
              label="Phone Number"
              withAsterisk
              {...form.getInputProps("phoneNum")}
            />
            <TextInput
              placeholder="Your address"
              size="md"
              label="Address"
              withAsterisk
              {...form.getInputProps("address")}
            />
            <TextInput
              placeholder="Your postal code"
              size="md"
              label="Postal Code"
              withAsterisk
              {...form.getInputProps("postalCode")}
            />
          </Stepper.Step>
          <Stepper.Step label="Your home" /* description="Verify email" */>
            <Radio.Group
              name="homeType"
              label="What best describes your home?"
              description="Tip: Make sure your home accepts pets!"
              withAsterisk
              {...form.getInputProps("homeType")}
            >
              <Radio value="house" label="House" />
              <Radio value="condo" label="Condo" />
              <Radio value="hdb" label="HDB" />
            </Radio.Group>
            <Radio.Group
              name="outdoorSpace"
              label="Do you have an outdoor space outside your home?"
              withAsterisk
              {...form.getInputProps("outdoorSpace")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            <Radio.Group
              name="childrenPresent"
              label="Are there children in your household?"
              withAsterisk
              {...form.getInputProps("childrenPresent")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            {form.getInputProps("childrenPresent").value === "yes" ? (
              <Radio.Group
                name="numOfChildren"
                label="How many children live in your household?"
                withAsterisk
                /* style={{ visibility: {form.childrenPresent},}} */
                {...form.getInputProps("numOfChildren")}
              >
                <Radio value="1" label="1" />
                <Radio value="2" label="2" />
                <Radio value="3" label="3" />
                <Radio value="4" label="4 or more" />
              </Radio.Group>
            ) : null}
            {form.getInputProps("childrenPresent").value === "yes" &&
            form.getInputProps("numOfChildren").value > 0 ? (
              <Checkbox.Group
                label="Choose all age groups that apply"
                withAsterisk
                {...form.getInputProps("ageGroups")}
              >
                <Checkbox value="infant" label="Infant" />
                <Checkbox value="toddler" label="Toddler" />
                <Checkbox value="pre-teen" label="Pre-teen" />
                <Checkbox value="teenager" label="Teenager" />
              </Checkbox.Group>
            ) : null}
          </Stepper.Step>
          <Stepper.Step label="Other Pets" /* description="Get full access" */>
            <Radio.Group
              name="otherPetsPresent"
              label="Do you have any other pets?"
              withAsterisk
              {...form.getInputProps("otherPetsPresent")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            {form.getInputProps("otherPetsPresent").value === "yes" ? (
              <Checkbox.Group
                name="otherPetsTypes"
                label="Choose all pet types that apply"
                withAsterisk
                {...form.getInputProps("otherPetsTypes")}
              >
                <Checkbox value="dog" label="Dog" />
                <Checkbox value="cat" label="Cat" />
                <Checkbox value="rabbit" label="Rabbit" />
                <Checkbox value="bird" label="Bird" />
                <Checkbox value="small animal" label="Small Animals" />
                <Checkbox
                  value="reptiles/amphibians/fish"
                  label="Reptiles / Amphibians & Fish"
                />
              </Checkbox.Group>
            ) : null}
          </Stepper.Step>
          <Stepper.Step label="Lifestyle" /* description="Get full access" */>
            <Radio.Group
              name="activityLevel"
              label="What best describes the activity level of your household"
              withAsterisk
              {...form.getInputProps("activityLevel")}
            >
              <Radio value="minimal" label="Minimally Active" />
              <Radio value="moderate" label="Moderately Active" />
              <Radio value="high" label="Highly Active" />
            </Radio.Group>
            <Radio.Group
              name="dailyPetExercise"
              label="Are you able to provide daily excercise or daycare for your pet?"
              withAsterisk
              {...form.getInputProps("dailyPetExercise")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            <Radio.Group
              name="petAloneHours"
              label="How many hours will your pet be alone per day?"
              withAsterisk
              {...form.getInputProps("petAloneHours")}
            >
              <Radio value="0-3" label="0-3 hours" />
              <Radio value="4-6" label="4-6 hours" />
              <Radio value="7-9" label="7-9 hours" />
              <Radio value="9+" label="9 or more hours" />
            </Radio.Group>
            <Textarea
              name="adoptReason"
              label="Why are you looking to adopt?"
              placeholder="Tell us more about yourself and anyone else living in your home. i.e. What's your family story? Why do you think the two of you are the perfect match?"
              withAsterisk
              {...form.getInputProps("adoptReason")}
            />
          </Stepper.Step>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" disabled={active === 0} onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} variant="outline" disabled={active === 3}>
            Next step
          </Button>
          {active === 3 ? (
            <Button color="" disabled={allowSubmit} type="submit">
              Submit
            </Button>
          ) : null}
        </Group>
      </form>
    </Modal>
  );
};
