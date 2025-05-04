import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps & {
  name: string;
  valueAsNumber?: boolean;
};

export default function RHFTextField({ name, helperText, valueAsNumber, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            field.value === null || field.value === undefined
              ? ''
              : valueAsNumber ? +field.value : field.value
          }
          onChange={(e) => {
            const value = valueAsNumber ? +e.target.value : e.target.value;

            field.onChange(value);
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
