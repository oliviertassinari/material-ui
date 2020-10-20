import * as React from 'react';

const Box = React.forwardRef(function Box(props, ref) {
  const Component = props.component || 'div';
  return <Component {...props} ref={ref} />
});

export default function BoxCostOfReact() {
  return (
    <div>
      {new Array(1000).fill().map(() => (
        <Box>
          Cost of react
        </Box>
      ))}
    </div>
  );
}
