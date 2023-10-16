import React, { useState } from "react";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { checkOutOnSnipeIT, getChromebook, getUser } from "./FormFunctions";


// Get name from the student ID
const getName = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/student/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error getting the student's name:", error);
    throw error;
  }
};

// Get current date
const getDate = () => {
	const date = new Date();
	return date;
};





export default function CheckOutFormElement({ title }) {
  const { register, handleSubmit } = useForm();

  const [user, setUser] = useState(null);
  const [chromebook, setChromebook] = useState(null);
  const [id, setID] = useState(null);
  const [tag, setTag] = useState(null);

  const setUserInfo = async (id) => {
    try {
      const response = await getUser(id);
      setUser(response.data); // To get the user id: (response.data.rows[0].id)
    } catch (error) {
      console.error("Error in setUserInfo:", error);
      throw error;
    }
  };

  const setCBInfo = async (tag) => {
    try {
      const response = await getChromebook(tag);
      setChromebook(response.data);
    } catch (error) {
      console.error("Error in setCBInfo:", error);
      throw error;
    }
  };

  const setCurrentID = async (event) => {
    try {
      setID(event.target.value);
    } catch (error) {
      console.error("Error in setCurrentID: ", error);
    }
  };

  const setCurrentTag = (event) => {
    try {
      setTag(event.target.value);
    } catch (error) {
      console.error("Error in setCurrentTag: ", error);
    }
  };


  const handleConfirmation = async (confirmation) => {
    try {
        if (confirmation === true) {
            if (!user) { await setUserInfo(id); }
            if (!chromebook) { await setCBInfo(tag); }
            const userID = user.rows[0].id;
            
            // await setFullDatabaseLog();
            await checkOutOnSnipeIT(id, userID, tag, chromebook);
        }
    } catch (err) {
        console.error("Error in handleConfirmation:", err);
    }
  };

  const onSubmit = async () => {
    try {
      const confirmation = window.confirm(`Do you want to check out ${tag} from ${id}`);
      handleConfirmation(confirmation);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("id")}
            label="Student ID"
            variant="outlined"
            placeholder="ID"
            onChange={setCurrentID}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("assetTag")}
            label="Chromebook Asset Tag"
            variant="outlined"
            placeholder="Asset Tag"
            onChange={setCurrentTag}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
