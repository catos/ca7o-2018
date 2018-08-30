import * as React from 'react';
import { Link } from 'react-router-dom';

import { IRecipe } from '../../Models/IRecipe';

interface IProps {
    recipe: IRecipe;
    onClick: ((recipe: IRecipe) => void);
}

interface IState {
    showRecipeLink: boolean;
}

export class SearchResultItem extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showRecipeLink: false
        };

        this.onDragStart = this.onDragStart.bind(this);
    }

    public render() {
        const { recipe } = this.props;
        return (
            <div
                className="w-10"
                onClick={() => this.props.onClick(recipe)}
                onDragStart={this.onDragStart}
                draggable={true}
                onMouseEnter={this.onMouseEnter}
                onMouseOut={this.onMouseOut}>
                <h1>{recipe.name}</h1>
                <div className="card-img-top center-cropped search-thumbnail" style={{ backgroundImage: 'url(' + recipe.thumbnail + ')' }} />

                {this.state.showRecipeLink
                    ? <Link className="recipe-link" to={`/recipes/${recipe.guid}`}><span className="fa fa-info-circle" /></Link>
                    : ''}
            </div>
        );
    }

    private onDragStart(event: any) {
        event.dataTransfer.setData('text', JSON.stringify(this.props.recipe));
    }

    private onMouseEnter = () => {
        this.setState({ showRecipeLink: true });
    }

    private onMouseOut = () => {
        this.setState({ showRecipeLink: false });
    }
}
