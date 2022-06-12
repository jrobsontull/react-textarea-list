import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

import { TextareaUL, TextareaOL } from '../src';

const textareaULExample = `import { TextareaUL } from 'react-textarea-list';

const ExamplePage = () => {
  return (
    <div className="content">
      <TextareaUL bulletChar='- ' placeholder="Type here to see the magic..." />
    </div>
  );
}
              
export default ExamplePage;
`;

const Example = () => {
  const [openUlCode, setOpenUlCode] = useState(false);

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
            <div
              className="showCodeBtn"
              onClick={() => setOpenUlCode(!openUlCode)}
            >
              {`<>`} Show source
            </div>
            {openUlCode ? (
              <AceEditor
                mode="javascript"
                theme="tomorrow"
                value={textareaULExample}
                style={{ width: '100%', marginTop: '16px' }}
                showGutter={true}
                highlightActiveLine={false}
                maxLines={12}
              ></AceEditor>
            ) : (
              ''
            )}
          </div>
          <div className="block">
            <h2>React &lt;TextareaOL /&gt; component</h2>
            <p>Use this if you want an ordered list.</p>
            <TextareaOL placeholder="Type here to see the magic..." />
          </div>
        </div>
        <div className="right">
          <div className="block">
            <h2 id="getting-started">Getting Started</h2>
            <p id="terminal">npm install react-textarea-list</p>
          </div>
          <div className="block">
            <h2>About</h2>
            <p>Some text here.</p>
          </div>
          <div className="block">
            <h2>Props {`<TextareaUL />`}</h2>
            <p></p>
            <table>
              <thead>
                <tr>
                  <th>Prop Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>style</td>
                  <td>React.CSSProperties</td>
                  <td>false</td>
                  <td>n/a</td>
                  <td>Used for in-line styling of the textarea element.</td>
                </tr>
                <tr>
                  <td>bulletChar</td>
                  <td>string</td>
                  <td>false</td>
                  <td>-</td>
                  <td>
                    Character used as bullet points. Does not have to be a
                    single character.
                  </td>
                </tr>
                <tr>
                  <td>defaultValue</td>
                  <td>string</td>
                  <td>false</td>
                  <td>n/a</td>
                  <td>Use to set the default value of the textarea.</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td>string</td>
                  <td>false</td>
                  <td>n/a</td>
                  <td>Use to set the placeholder text of the textarea.</td>
                </tr>
                <tr>
                  <td>listOutput</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>true</td>
                  <td>
                    When set to true, the onChange event returns a list of
                    elements denoting each line. When false, the vanilla text
                    with new line characters is returned.
                  </td>
                </tr>
                <tr>
                  <td>onChange</td>
                  <td>{`(value?: string | string[]) => void`}</td>
                  <td>false</td>
                  <td>n/a</td>
                  <td>
                    Fired on every onChange event of the textarea. Works
                    similarly to vanilla textarea onChange property.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('root'));
