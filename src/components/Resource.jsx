import React, { useState, useEffect } from "react";
import axios from "axios";

const Resource = ({ path, render }) => {
  const initialState = {
    trans: [],
    loading: true,
    error: null,
  };

  const [state, setState] = useState(initialState);

  const getData = async () => {
    try {
      const result = await axios.get(path, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(" result ", result);

      const newData = {
        trans: [...result.data.message],
        loading: false,
        error: null,
      };

      setState(newData);
    } catch (error) {
      console.log("error in get data", error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{render(state)}</div>;
};

export default Resource;
