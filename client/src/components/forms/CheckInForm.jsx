import React, { useState } from 'react';
import { Button, Container, FormControl, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { checkIn, getChromebook } from '../../hooks/api/SnipeIT';

export default function CheckInForm({ title }) {
  const { register, handleSubmit } = useForm();

  const [assetTag, setAssetTag] = useState(null);


  const setCurrentTag = (event) => {
    try {
      setAssetTag(event.target.value);
    } catch (error) {
      console.error('Error in setCurrentTag: ', error);
    }
  };

  const handleConfirmation = async (confirmation) => {
    try {
      if (confirmation === true) {
        await checkIn(assetTag);
      }
    } catch (err) {
      console.error('Error in handleConfirmation:', err);
    }
  };

  const onSubmit = async () => {
    try {
      const confirmation = window.confirm(`Do you want to check in ${assetTag}?`);
      handleConfirmation(confirmation);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography
        variant='h5'
        align='center'
        gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          fullWidth
          margin='normal'>
          <TextField
            {...register('assetTag')}
            label='Chromebook Asset Tag'
            variant='outlined'
            placeholder='Asset Tag'
            onChange={setCurrentTag}
          />
        </FormControl>
        <FormControl
          fullWidth
          margin='normal'>
          <Button
            type='submit'
            variant='contained'
            color='primary'>
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
