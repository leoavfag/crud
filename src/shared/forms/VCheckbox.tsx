import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';

type Props = {
  name: string;
  label?: string;
  value?: string;
};

type TVCheckboxProps = CheckboxProps & Props;

export const VCheckbox: React.FC<TVCheckboxProps> = ({
  name,
  value,
  label,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue } = useField(name);
  const inputRef = useRef(null);
  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.checked,
      clearValue: (ref) => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      },
    });
  }, [defaultValue, registerField, fieldName, defaultChecked]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...rest}
          defaultChecked={defaultChecked}
          value={value}
          inputRef={inputRef}
          id={fieldName}
        />
      }
      label={label}
    />
  );
};
