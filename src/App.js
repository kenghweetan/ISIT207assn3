import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./styles/App.css";
import "./styles/card.css";
import "./styles/index.css";
import "./styles/loader.css";
import "./styles/pagination.css";
import "./styles/toolTip.css";

import Home from "./components/Home";
import About from "./components/About";
import { HeaderMenu } from "./components/Navbar";
import PetSearch from "./components/PetSearch";
import { MantineProvider, createStyles } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { FooterLinks } from "./components/Footer";
import { PetProvider } from "./components/PetContext";
import ShowPet from "./components/ShowPet";
import { AdoptForm } from "./components/AdoptForm";
import { ReleaseForm } from "./components/ReleaseForm";
import { AuthProvider } from "./AuthContext";
import { NotFoundTitle } from "./components/ErrorPage";

const useStyles = createStyles((themes) => ({
  app: {
    display: "grid",
    minHeight: "100vh",
    /*  gridGap: "10px", */
    gridTemplateColumns: "1fr",
    gridTemplateAreas: `"header" "main" "footer"`,
    gridTemplateRows: "auto 1fr auto",
    gridAutoRows: "fit-content",
  },
  header: {
    gridArea: "header",
  },
  main: {
    gridArea: "main",
  },
  footer: {
    gridArea: "footer",
  },
}));

const App = () => {
  const { classes } = useStyles();
  return (
    <MantineProvider
      theme={{
        fontFamily: "figtree,sans-serif",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "Greycliff CF, sans-serif" },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AuthProvider>
        <NotificationsProvider>
          <PetProvider>
            <Router>
              <div className={classes.app}>
                <HeaderMenu
                  links={[
                    { label: "Home", link: "/" },
                    {
                      label: "Find a pet",
                      /* link: "/Search",  */ links: [
                        { label: "Find a cat", link: "/Search/cat" },
                        { label: "Find a dog", link: "/Search/dog" },
                      ],
                    },
                    { label: "Release a pet", link: "/Release" },
                    { label: "About us", link: "/About" },
                  ]}
                />
                <div className={classes.main}>
                  <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/Search" element={<PetSearch />}>
                      <Route path="cat" element={<ShowPet petType="cat" />} />
                      <Route path="dog" element={<ShowPet petType="dog" />} />
                    </Route>
                    <Route path="/AdoptForm/:id" element={<AdoptForm />} />
                    <Route path="/Release" element={<ReleaseForm />} />
                    <Route path="/About" element={<About />} />
                    <Route path="*" element={<NotFoundTitle />} />
                  </Routes>
                </div>
                <FooterLinks
                  data={{
                    groupedLinks: [
                      {
                        /*                    title: "Hi", */
                        links: [
                          { label: "Home", link: "/" },
                          { label: "Find a cat", link: "/Search/cat" },
                          { label: "Find a dog", link: "/Search/dog" },
                          { label: "Release a pet", link: "/Release" },
                          { label: "About us", link: "/About" },
                        ],
                      },
                    ],
                    class: classes.footer,
                  }}
                />
              </div>
            </Router>
          </PetProvider>
        </NotificationsProvider>
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
