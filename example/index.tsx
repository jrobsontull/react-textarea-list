import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextareaUL from '../src';

const UnorderedTextarea = () => {
  return <TextareaUL />;
};

const OrderedTextarea = () => {
  return <TextareaUL />;
};

const Example = () => {
  return (
    <div className="container">
      <div className="block" id="first-child">
        <h2>React &lt;TextareaUL /&gt; component</h2>
        <UnorderedTextarea />
      </div>
      <div className="block">
        <h2>React &lt;TextareaOL /&gt; component</h2>
        <OrderedTextarea />
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
