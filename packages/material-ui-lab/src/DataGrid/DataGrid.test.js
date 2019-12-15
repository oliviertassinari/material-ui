import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import DataGrid from './DataGrid';

describe('<DataGrid />', () => {
  let mount;
  const render = createClientRender();
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<DataGrid />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DataGrid />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<DataGrid />);

    expect(container.firstChild).to.have.class(classes.root);
  });
});
