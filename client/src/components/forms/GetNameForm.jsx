import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, FormControl, TextField, Typography, Button } from '@mui/material';
import { getUser } from '../../hooks/api/SnipeIT';

export default function GetNameForm() {
  const { register, handleSubmit } = useForm();

  const [studentId, setStudentId] = useState(null);

  const setCurrentID = (event) => {
    try {
      setStudentId(event.target.value);
    } catch (error) {
      console.error('Error setting current ID:', error);
    }
  };

  const onSubmit = async () => {
    try {
      if (studentId) {
        const user = await getUser(studentId);
        const name = `${user.data.rows[0].name}`;
        if (name) {
          window.alert(`The student's name with ID ${studentId} is ${name}`);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };

  return (
    <Container maxWidth='md'>
      <Typography
        variant='h5'
        align='center'
        gutterBottom>
        Get the student's name from ID
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          fullWidth
          margin='normal'>
          <TextField
            {...register('id')}
            label='Student ID'
            variant='outlined'
            placeholder='Student ID'
            onChange={setCurrentID}
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
