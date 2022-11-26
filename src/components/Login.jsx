import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
  createStyles,
} from "@mantine/core";
/* import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons"; */
import { useContext, useState } from "react";
import { PetContext } from "./PetContext";
import { useAuth } from "../AuthContext";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 500,
    fontSize: theme.fontSizes.lg,
  },
}));

export function AuthenticationForm(props) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <LoginForm opened={opened} setOpened={setOpened} />
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Login</Button>
      </Group>
    </>
  );
}
export function LoginForm({ opened, setOpened }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const { login, signup } = useAuth();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Welcome to Pet Heaven!`}
      classNames={{ title: classes.title }}
    >
      {/*    <Paper radius="md" p="xl" withBorder {...props}> */}

      {/*           <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          /> */}

      <form
        onSubmit={form.onSubmit(() => {
          if (type === "register") {
            signup(form.values.email, form.values.password);
          } else {
            login(form.values.email, form.values.password);
          }
        })}
      >
        <Stack>
          {type === "register" && (
            <Text color="dimmed">
              Sign up to receive news of our upcoming events and support us!
            </Text>
          )}
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@petHeaven.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept the terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
      {/*       </Paper> */}
    </Modal>
  );
}
