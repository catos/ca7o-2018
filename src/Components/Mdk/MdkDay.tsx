import * as React from 'react';

// import imageIcon from '../../Images/image-icon.svg';

import { IDay } from "./IDay";
import { IRecipe } from '../../Models/IRecipe';

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
        const { day } = this.props;

        let className = "week-menu-item";
        if (this.props.day.selected) {
            className += " selected";
        }

        if (this.state.dragOver) {
            className += " drag-over";
        }

        if (this.props.day.recipe !== null && this.props.day.recipe.tags.includes('fisk')) {
            className += " has-fish";
        }

        const thumbnail = day.recipe !== null ? day.recipe.thumbnail : '';

        return (
            <div
                className={className}
                onClick={() => this.props.onClick(day)}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDragExit={this.onDragExit}>

                <div className="day-name">
                    {day.name}
                </div>
                <div className="center-cropped week-thumbnail" style={{ backgroundImage: 'url(' + thumbnail + ')' }} />
                <div className="recipe-name">
                    {day.recipe !== null
                        ? day.recipe.name
                        : 'Tom dag, velg en oppskrift'}
                </div>
                <div className="recipe-meta">
                    {day.recipe !== null
                        ? <div>
                            <span>{day.recipe.time} <i className="far fa-clock" /></span>

                            {day.recipe.url !== undefined && day.recipe.url.indexOf('meny.no') !== -1
                                ? <a href={day.recipe.url}><span className="badge badge-danger ml-2">MENY</span></a>
                                : ''
                            }

                        </div>
                        : ''
                    }
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

        this.props.onDrop(this.props.day, recipe);
    }
}