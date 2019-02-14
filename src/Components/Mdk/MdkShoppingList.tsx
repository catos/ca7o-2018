import * as React from 'react';

import { IngredientTypes } from '../../Models/IngredientTypes';
import { IIngredient } from '../../Models/IIngredient';
import { groupBy } from '../../Common/Utils';

interface IIngredientsGroup {
    type: string;
    ingredients: IIngredient[];
}

interface IProps {
    showShoppingList: boolean;
    shoppingList: IIngredient[];
}

export const MdkShoppingList: React.SFC<IProps> = (props) => {

    const getGroupedShoppingList = (): IIngredientsGroup[] => {
        const result: IIngredientsGroup[] = [];
        const ingredientsGrouped = groupBy<IIngredient>(props.shoppingList, 'type');
        for (const key in ingredientsGrouped) {
            if (ingredientsGrouped.hasOwnProperty(key)) {
                result.push({
                    type: IngredientTypes[key] || 'Unknown',
                    ingredients: ingredientsGrouped[key]
                })
                // console.log(IngredientTypes[key], ingredientsGrouped[key]);
            }
        }

        return result;
    }

    if (!props.showShoppingList) {
        return null;
    }

    return (
        <div className="shopping-list">
            <h3>Handleliste</h3>
            <div className="list">
                {getGroupedShoppingList().map((group, idx) =>
                    <div key={idx} className="list-group">
                        <h4>{group.type}</h4>
                        {group.ingredients.map((ingredient, iidx) =>
                            <div key={iidx}>
                                {ingredient.quantity} {ingredient.unit}. <a href={`https://meny.no/Sok/?query=${ingredient.name}&expanded=products`}>{ingredient.name}</a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}