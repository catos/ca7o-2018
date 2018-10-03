import * as React from 'react';

import { IngredientTypes } from "../../../Models/IngredientTypes";
import { Input } from 'reactstrap';
import { ChangeEvent } from 'react';
import { IIngredient } from '../../../Models/IIngredient';

interface IProps {
    ingredient: IIngredient;
    onChange: ((ingredient: IIngredient) => void);
}

interface IState {
    editMode: boolean;
}

export class RecipeIngredientDetails extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editMode: false
        };
    }

    public render() {
        const { ingredient } = this.props;

        const ingredientTypesKeys = Object.keys(IngredientTypes)
            .filter(p => typeof IngredientTypes[p as any] === "number");

        return (<tr
            onClick={this.showForm}
            onBlur={this.hideForm}>
            <td>
                <Input type="text" name="quantity" id="quantity" placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={this.onFieldValueChange} />
            </td>
            <td>
                <Input type="text" name="unit" id="unit" placeholder="Unit"
                    value={ingredient.unit}
                    onChange={this.onFieldValueChange} />
            </td>
            <td>
                <Input type="text" name="name" id="name" placeholder="Name"
                    value={ingredient.name}
                    onChange={this.onFieldValueChange} />
            </td>
            <td>
                <Input type="select" name="type" id="type" placeholder="Type"
                    value={ingredient.type}
                    onChange={this.onFieldValueChange}>
                    {ingredientTypesKeys.map((key, idx) =>
                        <option key={idx} value={IngredientTypes[key]}>{key}</option>
                    )}
                </Input>
            </td>
        </tr>);
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.ingredient[event.target.name] = event.target.value;
        this.props.onChange(this.props.ingredient);
    }

    private showForm = () => {
        this.setState({ editMode: true });
    }

    private hideForm = () => {
        this.setState({ editMode: false });
    }
}