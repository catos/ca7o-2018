import * as React from "react";
import { ChangeEvent } from "react";
import { Input, Form, Button } from "reactstrap";

import { IngredientTypes } from "../../../Models/IngredientTypes";
import { IIngredient } from "../../../Models/IIngredient";

interface IProps {
    onAddIngredient: ((ingredient: IIngredient) => void);
}

export class AddRecipeIngredient extends React.Component<IProps, IIngredient> {

    private readonly defaultState = {
        _id: '',
        quantity: 1,
        unit: 'g',
        name: '',
        type: -1
    };

    constructor(props: IProps) {
        super(props);

        this.state = this.defaultState;
    }

    public render() {
        const ingredientTypesKeys = Object.keys(IngredientTypes)
            .filter(p => typeof IngredientTypes[p as any] === "number");

        return (
            <Form onSubmit={this.handleSubmit}>
                <h5>Add new ingredient</h5>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <Input type="text" name="quantity" id="quantity" placeholder="Quantity"
                                    value={this.state.quantity}
                                    onChange={this.onFieldValueChange} />
                            </td>
                            <td>
                                <Input type="text" name="unit" id="unit" placeholder="Unit"
                                    value={this.state.unit}
                                    onChange={this.onFieldValueChange} />
                            </td>
                            <td>
                                <Input type="text" name="name" id="name" placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.onFieldValueChange} />
                            </td>
                            <td>
                                <Input type="select" name="type" id="type" placeholder="Type"
                                    value={this.state.type}
                                    onChange={this.onFieldValueChange}>
                                    {ingredientTypesKeys.map((key, idx) =>
                                        <option key={idx} value={IngredientTypes[key]}>{key}</option>
                                    )}
                                </Input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit" name="submit">Add Ingredient</Button>
            </Form>
        );
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        }
        this.setState(nextState);
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onAddIngredient(this.state);
        this.setState(this.defaultState);
    }
}