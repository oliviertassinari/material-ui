import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@material-ui/lab/DesktopDateTimePicker';

export default function ResponsiveDateTimePickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <div style={{ width: 300 }}>
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(props) => <TextField {...props} margin="normal" />}
        />
        <DesktopDateTimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(props) => <TextField {...props} margin="normal" />}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} margin="normal" />}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
    </LocalizationProvider>
  );
}
