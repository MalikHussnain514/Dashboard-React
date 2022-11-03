/* eslint-disable no-debugger */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';
// import { useDebouncedCallback } from 'use-debounce';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { customInputLabelStyle, CustomTextField } from '../../../styles/mui/form';

const FormikField = (props) => {
    const {
        name,
        type = 'text',
        textArea,
        label,
        variant = 'outlined',
        rows,
        className,
        startIcon,
        endIcon,
        onChange,
        onBlur,
        ...restProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [innerValue, setInnerValue] = useState('');

    const [field, meta] = useField(name);
    const { onChange: onValueChange, onBlur: onFieldBlur, value, ...rest } = field;
    const { touched, error } = meta;

    const isOutlined = variant === 'outlined';
    const isPasswordField = type === 'password';

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setInnerValue(value);
        } else {
            setInnerValue('');
        }
    }, [value]);

    const debouncedHandleOnChange = (event) => {
        onValueChange(event);
        if (onChange) onChange(event.target.value, name);
    };

    const handleChange = useCallback(
        (event) => {
            setInnerValue(event.target.value);
            debouncedHandleOnChange(event);
        },
        [value, debouncedHandleOnChange]
    );

    const handleBlur = useCallback(
        (event) => {
            onFieldBlur(event);
            if (onBlur) onBlur(event.target.value, name);
        },
        [value, onBlur]
    );

    return (
        <>
            {!isOutlined && (
                <InputLabel shrink sx={customInputLabelStyle}>
                    {label}
                </InputLabel>
            )}
            <FormControl variant="outlined" error={touched && !!error} fullWidth>
                <CustomTextField
                    {...rest}
                    {...restProps}
                    type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
                    multiline={!!textArea}
                    variant={variant}
                    rows={rows || 4}
                    label={label}
                    size="medium"
                    error={touched && !!error}
                    autoComplete="nope"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={innerValue}
                    fullWidth
                />
                {error && <FormHelperText>{!!touched && error}</FormHelperText>}
            </FormControl>
        </>
    );
};

export default FormikField;
