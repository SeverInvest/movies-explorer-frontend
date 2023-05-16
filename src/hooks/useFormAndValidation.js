import { useState, useCallback } from 'react';

function useFormAndValidation(
  { initialValues = {},
    initialErrors = {},
    initialValid = true,
  } = {}) {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialValid);

  const handleChange = (e) => {

    const { name, value } = e.target
    console.log(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors };
}

export default useFormAndValidation;