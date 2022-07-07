import React, { useState, useEffect, forwardRef, ForwardedRef } from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextareaULProps
  extends Omit<TextareaProps, 'onChange' | 'defaultValue' | 'value'> {
  bulletChar?: string;
  defaultValue?: string;
  listOutput?: boolean;
  onChange?: (value?: string | string[]) => void;
}

export interface TextareaOLProps
  extends Omit<TextareaProps, 'onChange' | 'defaultValue' | 'value'> {
  defaultValue?: string;
  listOutput?: boolean;
  onChange?: (value?: string | string[]) => void;
}

const TextareaUL = forwardRef(
  (
    {
      bulletChar = '- ',
      defaultValue = '',
      listOutput = true,
      onChange,
      ...props
    }: TextareaULProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
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

      // Run onChange event and output current text
      if (onChange && !listOutput) {
        // Output vanilla text
        let vanillaText: string = newTextList.join('\n');
        if (
          vanillaText.length >= bulletCharLen &&
          vanillaText.slice(0, bulletCharLen) === bulletChar
        ) {
          vanillaText = vanillaText.slice(bulletCharLen);
        }

        onChange(vanillaText);
      } else if (onChange) {
        // Output list
        const currentTextList: string[] = newTextList;
        let firstElem: string = currentTextList[0];
        if (
          firstElem.length >= bulletCharLen &&
          firstElem.slice(0, bulletCharLen) === bulletChar
        ) {
          // Remove leading bullet char
          firstElem = firstElem.slice(bulletCharLen);
          currentTextList[0] = firstElem;
        }
        onChange(currentTextList);
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
      if (defaultValue?.length > 0) {
        setText(bulletChar + defaultValue);
      }
    }, [defaultValue]);

    return (
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        ref={ref}
        {...props}
      ></textarea>
    );
  }
);

const TextareaOL = forwardRef(
  (
    {
      listOutput = true,
      onChange,
      defaultValue = '',
      ...props
    }: TextareaOLProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    const [text, setText] = useState('');
    const [currentLineNum, setCurrentLineNum] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText: string = e.target.value;
      const newTextList: string[] = newText.split('\n');

      if (newTextList.length > currentLineNum) {
        // Delete a line
        newTextList.pop();
      }

      const cleanedTextList: string[] = [];
      newTextList.forEach((line: string) => {
        const cleanLine = line.replace(/\d+. /, '');
        cleanedTextList.push(cleanLine);
      });

      if (cleanedTextList[0] === '' && cleanedTextList.length === 0) {
        // Clear textarea
        setText('');
        setCurrentLineNum(1);
      } else {
        // Update textarea with formatted text
        let joined = '';
        cleanedTextList.forEach((line: string, index: number) => {
          joined += '\n' + (index + 1) + '. ' + line;
        });
        joined = joined.slice(1);

        setText(joined);
      }

      // Run onChange event and output current text
      if (onChange && !listOutput) {
        // Output vanilla text
        const vanillaText = cleanedTextList.join('\n');
        onChange(vanillaText);
      } else if (onChange) {
        // Output list
        onChange(cleanedTextList);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        setCurrentLineNum(currentLineNum + 1);
      } else if (
        e.key === 'Backspace' &&
        currentLineNum > 1 &&
        /\d./.test(text.slice(-3, -1))
      ) {
        setCurrentLineNum(currentLineNum - 1);
      } else if (
        e.key === 'Backspace' &&
        currentLineNum === 1 &&
        text === '1. '
      ) {
        setText('');
      }
    };

    // Update with defaultValue
    useEffect(() => {
      if (defaultValue?.length > 0) {
        setText('1. ' + defaultValue);
      }
    }, [defaultValue]);

    return (
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        ref={ref}
        {...props}
      />
    );
  }
);

export { TextareaUL, TextareaOL };
