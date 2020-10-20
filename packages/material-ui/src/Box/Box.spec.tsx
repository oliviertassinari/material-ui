import * as React from 'react';
import Box from '@material-ui/core/Box';

function ResponsiveTest() {
  <Box p={[2, 3, 4]} />;
  <Box p={{ xs: 2, sm: 3, md: 4 }} />;
  // undesired
  <Box p={{ xs: 2, sm: { you: "are dealing with 'any' here" }, md: 4 }} />;
  <Box fontSize={[12, 18, 24]}>Array API</Box>;
  <Box
    fontSize={{
      xs: 12,
      sm: 18,
      md: 24,
    }}
  >
    Object API
  </Box>;

  // KO 4.
  // @ts-expect-error wrong value for display
  <Box display="yolo" />;
  <Box
    sx={{
      // @ts-expect-error wrong value for display
      display: 'yolo',
    }}
  />;

  // KO 10.
  <Box component="img" src="/fake.png" />;
}
