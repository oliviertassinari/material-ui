import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  phone: chance.phone(),
  address: chance.address(),
  country: chance.country(),
  rating: chance.integer({ min: 1, max: 5 }),
}));

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'rating', label: 'Rating' },
  { field: 'address', label: 'Address' },
  { field: 'phone', label: 'Phone' },
  { field: 'country', label: 'Country' },
];

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      '& > *': {
        width: '100%',
        maxHeight: 200,
      },
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function SelectionGrid() {
  const classes = useStyles();
  const [selectionType, setSelectionType] = React.useState('row');
  return (
    <div className={classes.root}>
      <DataGrid rowsData={data} columns={columns} selection={selectionType} />
      <Paper className={classes.control}>
        <Grid container>
          <Grid item>
            <FormLabel>Multiple Selection</FormLabel>
            <Switch
              checked={selectionType === 'multiple, row'}
              onChange={e => {
                setSelectionType(e.target.checked ? 'multiple, row' : 'row');
              }}
              value="Select Multiple Rows"
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
