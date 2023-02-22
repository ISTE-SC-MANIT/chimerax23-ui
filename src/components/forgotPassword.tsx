import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import firebase from 'firebase';
interface Props {
  open: boolean;
  onClose: () => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

const FormDialog: React.FC<Props> = ({
  open,
  onClose,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [formData, setFormData] = React.useState({ email: '' });
  const router = useRouter();

  const initialValues = {
    email: '',
  };
  const handleChange = (field: string) => (e: any) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Provide a valid Email ID')
      .required('Email cannot be empty'),
  });
  const handleSubmit = (values: typeof initialValues) => {
    firebase
      .auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        setSuccessMessage('Reset Link has been sent to your mail.');
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.errors);
        return error;
      });
  };
  const handleClickOpen = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'> Forgot Password ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email id, a reset link will be sent to your registered
            email id which will redirect you to update password page.
          </DialogContentText>

          <Formik
            onSubmit={(values) => handleSubmit(values)}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form id='myform'>
              <Field name='email'>
                {({
                  field,
                  meta,
                }: FieldProps<typeof initialValues['email']>) => (
                  <TextField
                    fullWidth
                    id='email'
                    label='Email Address'
                    required
                    {...field}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.touched ? meta.error : ''}
                    variant='outlined'
                    margin='normal'
                    type='email'
                  />
                )}
              </Field>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
