import * as React from 'react';

export interface IOptions {
    text: string;
    value: string;
    selected: boolean;
}

interface IProps {
    name: string;
    label: string;
    options: IOptions[];
    required?: boolean;
    onChange: (fieldName: string, value: string) => void;
    error?: string;
}

export const Select: React.StatelessComponent<IProps> = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <select className="form-control" name={props.name} id={props.name} 
                required={props.required} 
                onChange={onChangeInput(props)}>
                {props.options.map((option, idx) =>
                    <option key={idx}
                        value={option.value}
                        selected={option.selected}>{option.text}</option>
                )}
            </select>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    );
}

const onChangeInput = (props: IProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.name, e.target.value);
}