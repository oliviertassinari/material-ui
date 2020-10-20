import * as React from 'react';

export default function BoxReactPrimitive() {
  return (
    <div>
      {new Array(1000).fill().map(() => (
        <div>
          Cost of react
        </div>
      ))}
    </div>
  );
}
