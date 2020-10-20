import * as React from 'react';
import Box from 'ui-box'

export default function BoxUiBox() {
  return (
    <div>
      {new Array(1000).fill().map(() => (
        <Box
          color="blue"
          backgroundColor="red"
          fontFamily="Roboto"
          fontSize="16px"
          padding="10px"
        >
          ui-box
        </Box>
      ))}
    </div>
  );
}
