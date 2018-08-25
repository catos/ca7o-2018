import * as React from 'react';
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
        return (
            <div
                className="w-10"
                onClick={() => this.props.onClick(this.props.recipe)} 
                onDragStart={this.onDragStart}
                draggable={true}>
                <h1>{this.props.recipe.name}</h1>
                <div className="card-img-top center-cropped search-thumbnail" style={{ backgroundImage: 'url(' + this.props.recipe.thumbnail + ')' }} />
            </div>
        );
    }

    private onDragStart(event: any) {
        event.dataTransfer.setData('text', JSON.stringify(this.props.recipe));
    }
}
