import * as React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function AccessibilityTooltips() {
  return (
    <div>
      <Tooltip title="Delete">
        <Button>Delete</Button>
      </Tooltip>
      <Tooltip describeChild title="Does not add if it already exists">
        <Button>Add</Button>
      </Tooltip>
    </div>
  );
}
