//useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function useFetch(collectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const querySnapshot = getDocs(collection(db, collectionName))
      .then((res) => {
        res.docs.length &&
          setData(
            res.docs.map((doc) => {
              return { ...doc.data() };
            })
          );
        setLoading(false);
        //checking for multiple responses for more flexibility
        //with the url we send in.
        console.log(res);

        /* res.content && setData(res.content); */
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        /*         setError("An error occurred. Awkward.."); */
      });
  }, [collectionName]);

  return { data, loading, error };
}

export default useFetch;
