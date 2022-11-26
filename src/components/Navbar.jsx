import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { Link } from "react-router-dom";
import { AuthenticationForm } from "./Login";
import logo from "../images/logo.png";
import { useAuth } from "../AuthContext";
import { ProfileMenu } from "./ProfileMenu";
import DonateForm from "./DonateForm";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    height: "27px",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export function HeaderMenu({ links }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { currentUser } = useAuth();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link key={item.label} to={item.link} className={classes.link}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link
              to={link.link}
              onClick={(e) => {
                e.preventDefault();
              }}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={56} /* mb={120} */ pos={"sticky"}>
      <Container>
        <div className={classes.inner}>
          <img src={logo} className={classes.logo} alt="Pet Heaven Logo" />
          <Group spacing={5} className={classes.links}>
            {items}

            {currentUser ? (
              <>
                <DonateForm />
                <ProfileMenu user={currentUser} />
              </>
            ) : (
              <>
                <DonateForm />

                <AuthenticationForm />
              </>
            )}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  );
}
