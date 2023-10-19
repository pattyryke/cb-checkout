import React, { useState } from 'react';
import { Button, Container, FormControl, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { checkOut } from '../../hooks/api/SnipeIT';

export default function CheckOutForm({ title }) {
  const { register, handleSubmit } = useForm();

  const [studentId, setStudentId] = useState(null);
  const [assetTag, setAssetTag] = useState(null);

  const getStudentIdFromForm = async (event) => {
    try {
      setStudentId(event.target.value);
    } catch (error) {
      console.error('Error in setCurrentID: ', error);
    }
  };

  const getAssetTagFromForm = (event) => {
    try {
      setAssetTag(event.target.value);
    } catch (error) {
      console.error('Error in setCurrentTag: ', error);
    }
  };

  const handleConfirmation = async (confirmation) => {
    try {
      if (confirmation === true) {
        await checkOut(assetTag, studentId);
      }
    } catch (err) {
      console.error('Error in handleConfirmation:', err);
    }
  };

  const onSubmit = async () => {
    try {
      const confirmation = window.confirm(`Do you want to check out ${assetTag} to ${studentId}`);
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
            {...register('id')}
            label='Student ID'
            variant='outlined'
            placeholder='ID'
            onChange={getStudentIdFromForm}
          />
        </FormControl>
        <FormControl
          fullWidth
          margin='normal'>
          <TextField
            {...register('assetTag')}
            label='Chromebook Asset Tag'
            variant='outlined'
            placeholder='Asset Tag'
            onChange={getAssetTagFromForm}
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
