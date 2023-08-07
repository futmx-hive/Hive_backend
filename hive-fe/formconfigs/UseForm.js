import { useReducer, useEffect, useState } from 'react';
import UseToggle from '../hooks/UseToogle';
import { DELETE, SET_INITIAL_ERRORS, UPDATE, RESET, ADD } from './FormActions';
import formReducer from './FormReducer';

export function UseForm(initialState, sch, initialIsValid = false) {
	const [schema, setSchema] = useState(sch);
	const [state, dispatch] = useReducer(formReducer, {
		...initialState,
		formIsValid: initialIsValid,
		errors: {},
	});

	const { isOpen, toogle, open: setSubmitting, close: stopSubmitting } = UseToggle();

	const { formIsValid, fields, errors } = state;

	const update = ({ name, index = undefined, payload }) => {
		dispatch({
			type: UPDATE,
			payload,
			index,
			name,
			schema,
		});
	};
	const add = ({ index = undefined, payload }) => {
		dispatch({
			type: ADD,
			payload,
			index,
			schema,
		});
	};
	const deleteFieldArray = ({ name, index = undefined, payload }) => {
		dispatch({
			type: DELETE,
			name,
			index,
			schema,
		});
	};

	const resetForm = () => {
		dispatch({
			type: RESET,
			payload: { ...initialState, formIsValid: initialIsValid, errors: {} },
		});
	};
	const setError = () =>
		dispatch({
			type: SET_INITIAL_ERRORS,
			schema,
		});
	useEffect(() => {
		setError();
	}, []);
	return {
		values: fields,
		formIsValid,
		resetForm,
		deleteFieldArray,
		onChange: update,
		errors,
		add,
		isSubmitting: isOpen,
		toggleSubmit: toogle,
		setSubmitting,
		stopSubmitting,
		setSchema,
		setError,
	};
}
export default UseForm;
