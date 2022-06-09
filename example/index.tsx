import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextareaUL from '../src';

const Example = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>React Listed Textarea Example</h1>
        <p>v1.0.0</p>
      </div>
      <div className="content">
        <div className="left">
          <div className="block">
            <h2>React &lt;TextareaUL /&gt; component</h2>
            <p>Use this if you want an unordered list.</p>
            <TextareaUL
              placeholder="Type here to see the magic..."
              bulletChar="- "
            />
          </div>
          <div className="block">
            <h2>React &lt;TextareaOL /&gt; component</h2>
            <p>Use this if you want an ordered list.</p>
            <TextareaUL />
          </div>
        </div>
        <div className="right">
          <div className="block">
            <h2 id="getting-started">Getting Started</h2>
            <p id="terminal">npm install react-textarea-list</p>
          </div>
          <div className="block">
            <h2>Usage</h2>
            <pre>
              <code>
                {`
                import TextareaUL from 'react-textarea-list';

                const ExamplePage = () => {
                  return (
                    <div className="content">
                      <TextareaUL bulletChar='- ' placeholder="What is the answer to life?" />
                    </div>
                  );
                }
                
                export default ExamplePage;
              `}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
