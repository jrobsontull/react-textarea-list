import React from 'react';
export interface TextareaListProps {
    style?: React.CSSProperties;
    bulletChar?: string;
    onChange?: (value?: string) => void;
}
declare const TextAreaList: ({ style, bulletChar, onChange, }: TextareaListProps) => JSX.Element;
export default TextAreaList;
