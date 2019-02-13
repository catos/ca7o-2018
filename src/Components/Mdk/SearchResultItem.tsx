import * as React from 'react';
import { Link } from 'react-router-dom';

import { IRecipe } from '../../Models/IRecipe';

interface IProps {
    recipe: IRecipe;
    onClick: ((recipe: IRecipe) => void);
}

export class SearchResultItem extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
    }

    public render() {
        const { recipe } = this.props;
        return (
            <div
                className="w-10"
                onClick={() => this.props.onClick(recipe)}
                onDragStart={this.onDragStart}
                draggable={true}>
                <h1>{recipe.name}</h1>
                <div className="card-img-top center-cropped image" style={{ backgroundImage: 'url(' + recipe.thumbnail + ')' }} />
                <Link className="recipe-link" to={`/recipes/${recipe.guid}`}><span className="fa fa-info-circle" /></Link>
            </div>
        );
    }

    private onDragStart(event: any) {
        event.dataTransfer.setData('text', JSON.stringify(this.props.recipe));
    }

}
