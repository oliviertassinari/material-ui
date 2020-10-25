import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

const DateRangeDelimiter = styled(Typography)(
  {
    margin: '0 16px',
  },
  { name: 'MuiPickersDateRangeDelimiter' },
);

export type DateRangeDelimiterProps = React.ComponentProps<typeof DateRangeDelimiter>;

export default DateRangeDelimiter;
