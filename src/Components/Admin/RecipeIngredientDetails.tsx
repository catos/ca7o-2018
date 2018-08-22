import * as React from 'react';

import { IngredientTypes } from './RecipeDetails';
import { FormGroup, Input } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { ChangeEvent } from 'react';

export interface IIngredient {
    quantity: number;
    unit: string;
    name: string;
    type: IngredientTypes;
}

interface IProps {
    ingredient: IIngredient;
    onChange: ((ingredient: IIngredient) => void);
}

export class RecipeIngredientDetails extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const ingredientTypesKeys = Object.keys(IngredientTypes)
            .filter(p => typeof IngredientTypes[p as any] === "number");

        return (
            <div>
                <FormGroup>
                    <Input type="text" name="quantity" id="quantity" placeholder="Quantity"
                        value={this.props.ingredient.quantity}
                        onChange={this.onFieldValueChange} />
                    <FormFeedback valid={false}>A quantity is required</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="unit" id="unit" placeholder="Unit"
                        value={this.props.ingredient.unit}
                        onChange={this.onFieldValueChange} />
                    <FormFeedback valid={false}>A unit is required</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="name" id="name" placeholder="Name"
                        value={this.props.ingredient.name}
                        onChange={this.onFieldValueChange} />
                    <FormFeedback valid={false}>A name is required</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="type" id="type" placeholder="Type"
                        value={this.props.ingredient.type}
                        onChange={this.onFieldValueChange}>
                        {ingredientTypesKeys.map((key, idx) => 
                            <option key={idx} value={IngredientTypes[key]}>{key}</option>
                        )}
                    </Input>
                    <FormFeedback valid={false}>A name is required</FormFeedback>
                </FormGroup>
            </div>
        );
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name + ', ' + event.target.value, this.props.ingredient[event.target.name]);
        this.props.ingredient[event.target.name] = event.target.value;
        this.props.onChange(this.props.ingredient);

        // const nextState = {
        //     ...this.state,
        //     user: {
        //         ...this.state.user,
        //         [event.target.name]: event.target.value
        //     }
        // };
        // this.setState(nextState);
    }


}