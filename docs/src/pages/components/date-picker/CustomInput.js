import * as React from 'react';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import { styled } from '@material-ui/core/styles';
import DesktopDatePicker from '@material-ui/lab/DatePicker';

const InputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export default function CustomInput() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <DesktopDatePicker
        label="Custom input"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <InputContainer>
            <input ref={inputRef} {...inputProps} />
            {InputProps?.endAdornment}
          </InputContainer>
        )}
      />
    </LocalizaitonProvider>
  );
}
