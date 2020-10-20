import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { logReactMetrics } from './utils';

// Get all the scenarios
const requirePerfScenarios = require.context('./scenarios', true, /(js|ts|tsx)$/);

const rootEl = document.getElementById('root');

const scenarioSuitePath = window.location.search.replace('?', '');

const TestCase = requirePerfScenarios(scenarioSuitePath).default;

function Profiler(props) {
  const start = performance.now();
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    // Force layout
    ref.current.getBoundingClientRect();

    const end = performance.now();
    window.timing = {
      render: end - start,
    };
  });

  return (
    <div ref={ref}>{props.children}</div>
  );
}

Profiler.propTypes = {
  children: PropTypes.node,
};

ReactDOM.render(
  <React.Profiler id={scenarioSuitePath} onRender={logReactMetrics}>
    <Profiler>
      <TestCase />
    </Profiler>
  </React.Profiler>,
  rootEl,
);
