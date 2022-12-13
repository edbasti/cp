import React, { useEffect, useState, useCallback } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useFormControls } from '../../Forms/Client/ClientFormControls';
import { useId } from 'react-id-generator';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './styles.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CreateClient() {
	const { values, handleInputValue, handleFormSubmit, errors } = useFormControls();
	const [currentPage, setCurrentPage] = useState(1);
	const [htmlId] = useId();

	const [open, setOpen] = useState(false);

	const handleAlertClick = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	useEffect(() => {
		if (values.success) {
			handleAlertClick();
		}
	}, [values.success]);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleClick = () => {
		setCurrentPage(2);
	};

	const handleBack = () => {
		setCurrentPage(1);
	};

	return (
		<>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					This is a success message!
				</Alert>
			</Snackbar>
			<Box height='100vh'>
				<form onSubmit={handleFormSubmit} className='form-wrapper'>
					<Box className='subheader'>
						<Box className='subheader-wrapper'>
							{currentPage === 1 && <span className='number-icon active-number-icon'>1</span>}
							{currentPage === 2 && <CheckCircleIcon color='success' />}
							<span className='personal-details'>Personal details</span>
						</Box>
						<hr className='vertical-line' />
						<Box className='subheader-wrapper'>
							<span
								className={
									'number-icon ' + (currentPage === 1 ? 'inactive' : 'active') + '-number-icon'
								}
							>
								2
							</span>
							<span className='contact-details'>Contact details</span>
						</Box>
					</Box>
					<Box className='content-wrapper'>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							{currentPage === 1 && (
								<div key={htmlId}>
									<InputLabel shrink htmlFor='firstName'>
										First Name
									</InputLabel>
									<TextField
										onChange={handleInputValue}
										onBlur={handleInputValue}
										value={values.firstName}
										name='firstName'
										error={Boolean(errors['firstName'])}
										fullWidth
										autoComplete='none'
										{...(errors['firstName'] && {
											error: true,
											helperText: errors['firstName'],
										})}
									/>
									<InputLabel shrink htmlFor='lastName'>
										Last Name
									</InputLabel>
									<TextField
										onChange={handleInputValue}
										onBlur={handleInputValue}
										name='lastName'
										value={values.lastName}
										error={Boolean(errors['lastName'])}
										fullWidth
										autoComplete='none'
										{...(errors['lastName'] && {
											error: true,
											helperText: errors['lastName'],
										})}
									/>
								</div>
							)}
							{currentPage === 2 && (
								<div key={htmlId}>
									<InputLabel shrink htmlFor='email'>
										Email
									</InputLabel>
									<TextField
										onChange={handleInputValue}
										onBlur={handleInputValue}
										name='email'
										value={values.email}
										error={Boolean(errors['email'])}
										fullWidth
										autoComplete='none'
										{...(errors['email'] && {
											error: true,
											helperText: errors['email'],
										})}
									/>
									<InputLabel shrink htmlFor='phoneNumber'>
										Phone Number
									</InputLabel>
									<TextField
										onChange={handleInputValue}
										onBlur={handleInputValue}
										name='phoneNumber'
										value={values.phoneNumber}
										InputProps={{ type: 'number' }}
										error={Boolean(errors['phoneNumber'])}
										fullWidth
										autoComplete='none'
										{...(errors['phoneNumber'] && {
											error: true,
											helperText: errors['phoneNumber'],
										})}
									/>
								</div>
							)}
						</Box>
						<Box>
							{currentPage === 1 && (
								<Button
									disabled={values.firstName === '' || values.lastName === ''}
									size='medium'
									variant='contained'
									color='primary'
									onClick={handleClick}
								>
									Continue
								</Button>
							)}
							{currentPage === 2 && (
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Box component='span' onClick={handleBack}>
										<ArrowBackIcon className='back-arrow' />
										<Button>Back</Button>
									</Box>
									<Button
										disabled={values.email === '' || values.phoneNumber === ''}
										type='submit'
										size='medium'
										variant='contained'
										color='primary'
									>
										Create
									</Button>
								</Box>
							)}
						</Box>
					</Box>
				</form>
			</Box>
		</>
	);
}
