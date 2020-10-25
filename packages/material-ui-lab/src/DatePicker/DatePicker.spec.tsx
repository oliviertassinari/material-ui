import * as React from 'react';
import moment, { Moment } from 'moment';
import { DatePicker, StaticDatePicker, DayPicker, PickersDay } from '@material-ui/lab';
import DateFnsAdapter from '../dateAdapter/date-fns';
import MomentAdapter from '../dateAdapter/moment';

// Allows to set date type right with generic JSX syntax
<DatePicker<Date>
  value={new Date()}
  onChange={(date) => date?.getDate()}
  renderInput={() => null}
/>;

// Throws error if passed value is invalid
<DatePicker<Date>
  // @ts-expect-error Value is invalid
  value={moment()}
  onChange={(date) => date?.getDate()}
  renderInput={() => null}
/>;

// Inference from the state
const InferTest = () => {
  const [date, setDate] = React.useState<Moment | null>(moment());

  return <DatePicker value={date} onChange={(date) => setDate(date)} renderInput={() => null} />;
};

// Infer value type from the dateAdapter
<DatePicker
  value={moment()}
  onChange={(date) => console.log(date)}
  renderInput={() => null}
  dateAdapter={new MomentAdapter()}
/>;

// Conflict between value type and date adapter causes error
<DatePicker
  value={moment()}
  onChange={(date) => console.log(date)}
  renderInput={() => null}
  // @ts-expect-error
  dateAdapter={new DateFnsAdapter()}
/>;

// Conflict between explicit generic type and date adapter causes error
<DatePicker<Moment>
  value={moment()}
  onChange={(date) => console.log(date)}
  renderInput={() => null}
  // @ts-expect-error
  dateAdapter={new LuxonAdapter()}
/>;

// Allows inferring for side props
<DatePicker
  value={moment()}
  minDate={moment()}
  renderDay={(day) => <span> {day.format('D')} </span>}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => null}
/>;

// External components are generic as well
<DayPicker<Moment>
  view="date"
  views={['date']}
  date={moment()}
  minDate={moment()}
  maxDate={moment()}
  onChange={(date) => date?.format()}
/>;

<PickersDay<Date>
  day={new Date()}
  allowSameDateSelection
  outsideCurrentMonth
  onDaySelect={(date) => date?.getDay()}
/>;

// Edge case and known issue. When the passed `value` is not a date type
// We cannot infer the type properly without explicit generic type or `dateAdapter` prop
// So in this case it is expected that type will be `any` as for now
<DatePicker value={null} onChange={(date) => date?.getDate()} renderInput={() => null} />;

{
  // Allows to pass the wrapper-specific props only to the proper wrapper
  <StaticDatePicker
    value={new Date()}
    onChange={(date) => date?.getDate()}
    renderInput={() => null}
    displayStaticWrapperAs="desktop"
  />;

  <DatePicker
    value={new Date()}
    onChange={(date) => date?.getDate()}
    renderInput={() => null}
    // @ts-expect-error
    displayStaticWrapperAs="desktop"
  />;
}
