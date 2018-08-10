import * as React from 'react';

interface IProps {
    type?: string;
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    required?: boolean;
    onChange: (fieldName: string, value: string) => void;
    error?: string;
}

export const Input: React.StatelessComponent<IProps> = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={(props.type) ? props.type : 'text'} id={props.name}
                name={props.name}
                className="form-control"
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChangeInput(props)}
                required={props.required} />
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    );
}

const onChangeInput = (props: IProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.name, e.target.value);
}