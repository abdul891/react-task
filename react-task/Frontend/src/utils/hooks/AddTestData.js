import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTest } from "../functions/Test";

export const AddTestData = (setError) => {
  const [key, setKey] = useState(0);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const { id } = useParams();
  const isNotUpdateMode = !id;
  const someAsyncFunction = async () => {
    let data = !isNotUpdateMode ? await getTest(setError, id) : "";
    setUserToUpdate(data);
  };
  useEffect(() => {
    someAsyncFunction();
    setKey((prevKey) => prevKey + 1);
  }, [id]);

  return {
    key,
    userToUpdate,
    setKey,
    setUserToUpdate,
    isNotUpdateMode,
    id,
  };
};
