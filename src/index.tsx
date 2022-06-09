import React, { useState } from 'react';

export interface TextareaListProps {
  style?: React.CSSProperties;
  bulletChar?: string;
  onChange?: (value?: string) => void;
}

const TextareaUL = ({
  style,
  bulletChar = '-',
  onChange,
}: TextareaListProps): JSX.Element => {
  const [text, setText] = useState('');
  const [currentLineNum, setCurrentLineNum] = useState(1);
  const newLineChar: string = '\n' + bulletChar;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText: string = e.target.value;
    const newTextList: string[] = newText
      .replaceAll(newLineChar, '\n')
      .split('\n');

    if (newTextList.length > currentLineNum) {
      // Delete a line
      newTextList.pop();
    }

    let joined: string = newTextList.join(newLineChar);

    if (joined.charAt(0) !== bulletChar && joined.length !== 0) {
      // Add additional marker
      joined = '-' + joined;
    } else if (joined.length === 1 && joined === bulletChar) {
      // Empty so remove marker
      joined = '';
    }

    setText(joined);

    // Run onChange event
    if (onChange) {
      let vanillaText = newTextList.join('\n');
      if (vanillaText.charAt(0) === bulletChar) {
        vanillaText = vanillaText.slice(1);
      }
      onChange(vanillaText);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === 'Enter') {
      setCurrentLineNum(currentLineNum + 1);
    } else if (e.key === 'Backspace' && text.slice(-2) === newLineChar) {
      setCurrentLineNum(currentLineNum - 1);
    }
  };

  return (
    <textarea
      style={style}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    ></textarea>
  );
};

export default TextareaUL;
