import React, { useState, useEffect } from 'react';

export interface TextareaListProps {
  style?: React.CSSProperties;
  bulletChar?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
}

const TextareaUL = ({
  style,
  bulletChar = '-',
  defaultValue = '',
  onChange,
}: TextareaListProps): JSX.Element => {
  const [text, setText] = useState('');
  const [currentLineNum, setCurrentLineNum] = useState(1);
  const newLineChar: string = '\n' + bulletChar;
  const bulletCharLen: number = bulletChar.length;

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

    if (joined.length === bulletCharLen && joined === bulletChar) {
      // Empty so remove marker
      joined = '';
    } else if (
      joined.length > 0 &&
      joined.length <= bulletCharLen &&
      joined.slice(0, bulletCharLen) !== bulletChar
    ) {
      // Add additional marker
      joined = bulletChar + joined;
    }

    setText(joined);

    // Run onChange event
    if (onChange) {
      let vanillaText = newTextList.join('\n');
      if (
        vanillaText.length >= bulletCharLen &&
        vanillaText.slice(0, bulletCharLen) === bulletChar
      ) {
        vanillaText = vanillaText.slice(bulletCharLen);
      }

      onChange(vanillaText);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === 'Enter') {
      setCurrentLineNum(currentLineNum + 1);
    } else if (
      e.key === 'Backspace' &&
      text.slice(-newLineChar.length) === newLineChar
    ) {
      setCurrentLineNum(currentLineNum - 1);
    }
  };

  // Update textarea with default value
  useEffect(() => {
    if (defaultValue.length > 0) {
      setText(bulletChar + defaultValue);
    }
  }, [defaultValue]);

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
