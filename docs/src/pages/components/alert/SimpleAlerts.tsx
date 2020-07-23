import * as React from 'react';
import { XGrid } from "@material-ui/x-grid";

export default function App(props) {
  return (
    <div style={{ width: props.large ? 400 : 300, height: 600 }}>
      <XGrid
        rows={[
          {
            brand: "Nike",
          },
        ]}
        columns={[
          { field: "id", hide: true },
          { field: "brand", width: 100 },
        ]}
        options={{ checkboxSelection: true }}
      />
    </div>
  );
}
