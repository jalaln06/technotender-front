import React, {useState} from 'react';
import {Button} from 'antd';

import {Tag} from './tag';
import {EditorInput} from './input/editor-input';

import './formula-editor.less';

export interface AutocompleteValue {
    type: EditorValueType.Autocomplete;
    content: {
        key: string;
        value: string;
        label: string;
    };
}

export interface InputValue {
    type: EditorValueType.Input;
    content: {
        label: string;
    };
}

export enum EditorValueType {
    Autocomplete = 'autocomplete',
    Input = 'input',
}

export type EditorValue = AutocompleteValue | InputValue

export const FormulaEditor = () => {
    const [editorValues, setEditorValues] = useState<EditorValue[]>([
        {
            type: EditorValueType.Autocomplete,
            content: {
                key: '1',
                value: '1',
                label: 'KPI',
            },
        },
        {
            type: EditorValueType.Input,
            content: {
                label: '+',
            },
        },
        {
            type: EditorValueType.Autocomplete,
            content: {
                key: '1',
                value: '1',
                label: 'расход',
            },
        },
    ]);

    const deletePreviousEditorTag = (index: number) => {
        if (!editorValues[index] || !(editorValues[index].type === EditorValueType.Autocomplete)) {
            return;
        }
        setEditorValues(v => v.filter((_, i) => i !== index));
    };

    console.log(editorValues);

    return (
        <div className="editor-wrapper">
            <Button
                onClick={() => setEditorValues([...editorValues, {
                    type: EditorValueType.Autocomplete,
                    content: {key: '1', value: '1', label: 'NewValue'},
                }])}
                type="primary"
            >
                Add tag
            </Button>

            <div className="editor">
                {editorValues.map(({type, content}, index) => (
                    type === EditorValueType.Autocomplete ? (
                        <Tag
                            key={content.key}
                            label={content.label}
                        />
                    ) : (
                        <EditorInput
                            key={content.label}
                            value={content.label}
                            deletePreviousEditorTag={() => deletePreviousEditorTag(index - 1)}
                        />
                    )
                ))}
            </div>
        </div>
    );
};
