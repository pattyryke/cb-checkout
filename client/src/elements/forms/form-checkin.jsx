import React, { useState } from "react";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CheckIn, getChromebook } from "./FormFunctions";


export default function CheckInFormElement({ title }) {
  const { register, handleSubmit } = useForm();

  const [chromebook, setChromebook] = useState(null);
  const [tag, setTag] = useState(null);


  const setCBInfo = async (tag) => {
    try {
      const response = await getChromebook(tag);
      setChromebook(response.data);
    } catch (error) {
      console.error("Error in setCBInfo:", error);
      throw error;
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
            if (!chromebook) { await setCBInfo(tag); }
            
            // await setFullDatabaseLog();
            await CheckIn(chromebook);
        }
    } catch (err) {
        console.error("Error in handleConfirmation:", err);
    }
  };

  const onSubmit = async () => {
    try {
      const confirmation = window.confirm(`Do you want to check in ${tag}?`);
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
