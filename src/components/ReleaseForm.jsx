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
  Select,
  Modal,
  Text,
  useMantineTheme,
  Anchor,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addDoc, collection } from "firebase/firestore";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX, IconUpload, IconPhoto } from "@tabler/icons";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import TermsAndConditions from "./TermsAndConditionsModal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "emailjs-com";

function Demo() {
  return <></>;
}

export const ReleaseForm = () => {
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const [allowSubmit, setAllowSubmit] = useState(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      address: "",
      postalCode: "",
      petType: "",
      spayedOrNeutered: "",
      petInfo: "",
      rehomeReason: "",
      newHomeDeadline: "",
      petName: "",
      petPhoto: null,
      overEighteen: false,
      agreeTerms: false,
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
          petType:
            values.petType !== "cat" && values.petType !== "dog"
              ? "Please select your pet type."
              : null,
          spayedOrNeutered:
            values.spayedOrNeutered !== "yes" &&
            values.spayedOrNeutered !== "no"
              ? "Please select whether your pet has been spayed or neutered."
              : null,
          rehomeReason: !values.rehomeReason
            ? "Please select the reason for rehoming your pet."
            : ![
                "Behavourial issues",
                "Busy schedule",
                "Does not get along with another pet",
                "Fostered",
                "Found or Abandoned",
                "Human health issues (e.g. allergies, sickness)",
                "Infant, children or pregnancy",
                "Landlord permission issues",
                "Ongoing costs (e.g. lost job)",
                "Pet medical expenses (e.g. vet procedure)",
                "Relocating (e.g. moving)",
              ].includes(values.rehomeReason)
            ? "Invalid reason."
            : null,
          newHomeDeadline: !values.newHomeDeadline
            ? "Please select how long you are able to keep your pet"
            : ![
                "Less than one week",
                "1 week",
                "2 weeks",
                "3 weeks",
                "1 month",
                "2 months",
                "More than 2 months",
              ].includes(values.newHomeDeadline)
            ? "Invalid duration."
            : null,
        };
      }

      if (active === 2) {
        return {
          petName: !values.petName ? "Please provide your pet's name" : null,
          petPhoto: !values.petPhoto
            ? "Please provide a photo of your pet"
            : null,
          overEighteen: !values.overEighteen ? "Check this to continue" : null,
          agreeTerms: !values.agreeTerms ? "Check this to continue" : null,
          petInfo: !values.petInfo ? "Please fill this up to continue" : null,
        };
      }
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
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Title>Pet Release form</Title>
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
            const releaseCol = collection(db, "releaseApplications");
            try {
              setAllowSubmit(true);
              const { petPhoto, ...valuesExcPhoto } = values;
              const storage = getStorage();
              const storageRef = ref(storage, petPhoto.name);

              // 'file' comes from the Blob or File API
              await uploadBytes(storageRef, petPhoto);
              console.log();

              const photoURL = await getDownloadURL(
                ref(storage, petPhoto.name)
              );
              await addDoc(releaseCol, {
                ...valuesExcPhoto,
                petPhoto: photoURL,
              });
              console.log(photoURL);
              await emailjs.send(
                "service_79te5fr",
                "template_rej7b7p",
                { ...valuesExcPhoto, photoOfPet: `"${photoURL}"` },
                "3_aLZ1Ewod1hxomsu"
              );

              updateNotification({
                id: "load-data",
                color: "teal",
                title: "Rehome application submitted",
                message: "You will be redirected home in 2 seconds.",
                icon: <IconCheck size={16} />,
                autoClose: 2000,
                onClose: () => {
                  "bye";
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                },
              });
            } catch (error) {
              console.log(error);
              /*               showNotification({
                id: "hello-there",
                disallowClose: true,
                onClose: () => console.log("unmounted"),
                onOpen: () => console.log("mounted"),
                autoClose: 5000,
                title: "Something has gone wrong",
                message: "Please try again later.",
                color: "red",
                icon: <IconX />,
                className: "my-notification-class",
                style: { backgroundColor: "red" },
                sx: { backgroundColor: "red" },
                loading: false,
              }); */
            }

            setActive(0);
            /* form.reset(); */
          },
          (validationErrors, _values, _event) => {
            console.log(validationErrors);
          }
        )}
      >
        <Stepper active={active} /*  onStepClick={setActive} */ breakpoint="sm">
          <Stepper.Step label="Start" /* description="Create an account" */>
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
              placeholder="Your home address"
              size="md"
              label="Address"
              withAsterisk
              {...form.getInputProps("address")}
            />
            <TextInput
              placeholder="Your Postal Code"
              size="md"
              label="Postal Code"
              withAsterisk
              {...form.getInputProps("postalCode")}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Release Questions" /* description="Verify email" */
          >
            <Radio.Group
              name="petType"
              label="Are you rehoming a dog or cat?"
              withAsterisk
              {...form.getInputProps("petType")}
            >
              <Radio value="dog" label="Dog" />
              <Radio value="cat" label="Cat" />
            </Radio.Group>
            <Radio.Group
              name="spayedOrNeutered"
              label="Is your pet spayed or neutered?"
              withAsterisk
              {...form.getInputProps("spayedOrNeutered")}
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Radio.Group>
            <Select
              name="rehomeReason"
              label="Why do you need to rehome your pet?"
              placeholder="Select one"
              data={[
                "Behavourial issues",
                "Busy schedule",
                "Does not get along with another pet",
                "Fostered",
                "Found or Abandoned",
                "Human health issues (e.g. allergies, sickness)",
                "Infant, children or pregnancy",
                "Landlord permission issues",
                "Ongoing costs (e.g. lost job)",
                "Pet medical expenses (e.g. vet procedure)",
                "Relocating (e.g. moving)",
              ]}
              withAsterisk
              {...form.getInputProps("rehomeReason")}
            />
            <Select
              name="newHomeDeadline"
              label="How long are you able to keep your pet while we help you find a suitable new home?"
              placeholder="Select one"
              data={[
                "Less than one week",
                "1 week",
                "2 weeks",
                "3 weeks",
                "1 month",
                "2 months",
                "More than 2 months",
              ]}
              withAsterisk
              {...form.getInputProps("newHomeDeadline")}
            />
          </Stepper.Step>
          <Stepper.Step label="Pet Info" /* description="Get full access" */>
            <TextInput
              placeholder="Pet name"
              size="md"
              label="Your pet's name"
              withAsterisk
              {...form.getInputProps("petName")}
              style={{ marginBottom: "20px" }}
            />
            <FileInput
              label="A photo of your pet"
              size="xs"
              {...form.getInputProps("petPhoto")}
            />
            <Container style={{ width: "100%", textAlign: "center" }}>
              <Button
                color="red.7"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  setFiles([]);
                }}
                variant="outline"
              >
                Clear image
              </Button>
            </Container>
            <Textarea
              name="petInfo"
              label="Pet info"
              placeholder="Tell us more about your pet."
              withAsterisk
              {...form.getInputProps("petInfo")}
              style={{ marginBottom: "20px" }}
            />
            <Checkbox
              label="I am above the age of 18 years old"
              {...form.getInputProps("overEighteen")}
            />
            <TermsAndConditions />
            <Checkbox
              label="I agree to Pet Heaven's Terms and Conditions"
              {...form.getInputProps("agreeTerms")}
            />
          </Stepper.Step>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" disabled={active === 0} onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} variant="outline" disabled={active === 2}>
            Next step
          </Button>
          {active === 2 ? (
            <Button color="" disabled={allowSubmit} type="submit">
              Submit
            </Button>
          ) : null}
        </Group>
      </form>
    </Container>
  );
};
