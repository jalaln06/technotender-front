import React, {useState} from 'react';

import './editor-input.less';

const OperatorKeys = ['-', '+', '*', '/'];

const NumberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const AllowedKeys = OperatorKeys.concat(NumberKeys);

export interface EditorInputProps {
    value: string;
    extendedAllowedKeys?: string[];
    deletePreviousEditorTag: () => void;
}

export const EditorInput = ({value: initialValue, extendedAllowedKeys, deletePreviousEditorTag}: EditorInputProps) => {
    const inputAllowedValues = extendedAllowedKeys ? AllowedKeys.concat(extendedAllowedKeys) : AllowedKeys;
    const [value, setValue] = useState<string>(initialValue);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Backspace') {
            if (value.length === 0) {
                deletePreviousEditorTag();
            } else {
                setValue(value.substring(0, value.length - 1));
            }
        }
        if (inputAllowedValues.includes(e.key)) {
            setValue(value + e.key);
        }
    };

    return (
        <input
            onInput={() => {}}
            onKeyDown={handleKeyDown}
            defaultValue={value}
            className="editor-input"
        />
    );
};
