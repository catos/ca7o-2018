import * as React from 'react';

import { IDay } from './Mdk';
import { IRecipe } from './RecipesDb';

interface IProps {
    day: IDay;
    onClick: ((day: IDay) => void);
    onDrop: ((day: IDay, recipe: IRecipe) => void);
}

interface IState {
    dragOver: boolean;
}

export class MdkDay extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            dragOver: false
        };

        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragExit = this.onDragExit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    public render() {
        let className = "card w-20 week-menu-item";
        if (this.props.day.selected) {
            className += " selected"
        }
        if (this.state.dragOver) {
            className += " drag-over"
        }

        return (
            <div
                className={className}
                onClick={() => this.props.onClick(this.props.day)}
                onDrop={this.onDrop} 
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDragExit={this.onDragExit}
                >
                <div className="title">
                    <h1>{this.props.day.name}</h1>
                </div>
                <div className="card-img-top center-cropped week-thumbnail" style={{ backgroundImage: 'url(' + this.props.day.recipe.thumbnail + ')' }} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.day.recipe.name}</h5>
                    <div><small>{this.props.day.recipe.time} <i className="far fa-clock" /></small></div>
                    <p className="card-text">{this.props.day.recipe.description}</p>
                </div>
            </div>
        );
    }

    private onDragOver(event: any) {
        event.preventDefault();        
        this.setState({ dragOver: true });
    }

    private onDragLeave() {
        this.setState({ dragOver: false });
    }

    private onDragExit() {
        this.setState({ dragOver: false });
    }

    private onDrop(event: any) {
        this.setState({ dragOver: false });

        const data = event.dataTransfer.getData("text");
        const recipe = JSON.parse(data) as IRecipe;
        console.log('recipe: ', recipe);

        this.props.onDrop(this.props.day, recipe);
    }
}