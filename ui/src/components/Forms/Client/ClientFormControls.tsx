import { useState, useContext, useCallback } from 'react';
import { createClient } from '../../../services/api';
import { useId } from 'react-id-generator';
import { StateContext } from '../../../store/DataProvider';

const PostClientForm = async (values: any, successCallback: any, errorCallback: any, clientId: string) => {
	// do stuff
	const data = {
		id: clientId,
		firstName: values.firstName,
		lastName: values.lastName,
		email: values.email,
		phoneNumber: values.phoneNumber,
	};

	createClient(data);

	// if successful
	if (true) successCallback();
	else errorCallback();
};

const initialFormValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	formSubmitted: false,
	success: false,
};

export const useFormControls = () => {
	const { state, dispatch } = useContext(StateContext);
	const [values, setValues] = useState(initialFormValues);
	const [errors, setErrors] = useState({} as any);
	const [htmlId] = useId();

	const validate: any = (fieldValues = values) => {
		let temp: any = { ...errors };

		if ('firstName' in fieldValues) temp.firstName = fieldValues.firstName ? '' : 'This field is required.';
		if ('lastName' in fieldValues) temp.lastName = fieldValues.lastName ? '' : 'This field is required.';

		if ('email' in fieldValues) {
			temp.email = fieldValues.email ? '' : 'This field is required.';
			if (fieldValues.email)
				temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email is not valid.';
		}

		if ('phoneNumber' in fieldValues) temp.phoneNumber = fieldValues.phoneNumber ? '' : 'This field is required.';

		setErrors({
			...temp,
		});
	};

	const handleInputValue = (e: any) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
		validate({ [name]: value });
	};

	const handleSuccess = () => {
		setValues({
			...initialFormValues,
			formSubmitted: true,
			success: true,
		});

		dispatch({ type: 'FETCH_ALL_CLIENTS', data: state.clients });
	};

	const handleError = () => {
		setValues({
			...initialFormValues,
			formSubmitted: true,
			success: false,
		});
	};

	const formIsValid = (fieldValues = values) => {
		const isValid =
			fieldValues.firstName &&
			fieldValues.lastName &&
			fieldValues.email &&
			fieldValues.phoneNumber &&
			Object.values(errors).every((x) => x === '');

		return isValid;
	};

	const handleFormSubmit = async (e: any) => {
		const isValid = Object.values(errors).every((x) => x === '') && formIsValid();
		if (isValid) {
			await PostClientForm(values, handleSuccess, handleError, htmlId);
		}
	};

	return {
		values,
		errors,
		handleInputValue,
		handleFormSubmit,
		formIsValid,
	};
};
