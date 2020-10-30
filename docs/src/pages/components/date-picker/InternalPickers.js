import * as React from 'react';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DayPicker from '@material-ui/lab/DayPicker';

export default function YearDatePicker() {
  const [date, setDate] = React.useState(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <DayPicker
        // do not attach global event listeners
        allowKeyboardControl={false}
        date={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizaitonProvider>
  );
}
