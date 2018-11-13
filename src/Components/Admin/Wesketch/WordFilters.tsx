import * as React from 'react';
import { IWordFilters } from './WordsList';

interface IProps {
    filters: IWordFilters;
    totalPages: number;
    onChange: (filters: IWordFilters) => void;
    addWord: (event: React.MouseEvent<HTMLElement>) => void;
}

export class WordFilters extends React.Component<IProps, {}> {

    public render() {
        const { difficulties, languages } = this.props.filters;

        return (
            <div className="filters">
                <form className="form-inline">
                    <div className="filter-languages btn-group mr-3">
                        <button type="button"
                            value="1"
                            className={"btn" + (languages.includes(1) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleLanguage}>English</button>
                        <button type="button"
                            value="2"
                            className={"btn" + (languages.includes(2) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleLanguage}>Norwegian</button>
                    </div>

                    <div className="filter-difficulties btn-group mr-3">
                        <button type="button"
                            value="1"
                            className={"btn" + (difficulties.includes(1) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Easy</button>
                        <button type="button"
                            value="2"
                            className={"btn" + (difficulties.includes(2) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Normal</button>
                        <button type="button"
                            value="3"
                            className={"btn" + (difficulties.includes(3) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Hard</button>
                    </div>

                    <div className="input-group mr-3">
                        <input className="form-control" type="text" name="q" placeholder="Search words"
                            value={this.props.filters.q}
                            onChange={this.onFieldValueChange}
                        />
                    </div>

                    <button className="btn btn-success" onClick={this.props.addWord}><span className="fa fa-plus" /></button>

                    <div className="ingput-group ml-3">
                        <button className="btn btn-info" 
                            value="-1"
                            onClick={this.modifyPage}>
                            <span className="fa fa-caret-left" />
                        </button>
                        <button className="btn btn-info" 
                            value="1"
                            onClick={this.modifyPage}>
                            <span className="fa fa-caret-right" />
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filters = { ...this.props.filters };
        filters.q = event.target.value;
        this.props.onChange(filters);
    }

    private toggleDifficulty = (event: React.MouseEvent<HTMLButtonElement>) => {
        const filters = { ...this.props.filters };
        filters.page = 1;

        const difficulty = +event.currentTarget.value;
        filters.difficulties = this.props.filters.difficulties.includes(difficulty)
            ? this.props.filters.difficulties.filter(p => p !== difficulty)
            : this.props.filters.difficulties.concat(difficulty);

        this.props.onChange(filters);
    }

    private toggleLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const filters = { ...this.props.filters };
        filters.page = 1;

        const language = +event.currentTarget.value;
        filters.languages = this.props.filters.languages.includes(language)
            ? this.props.filters.languages.filter(p => p !== language)
            : this.props.filters.languages.concat(language);

        this.props.onChange(filters);
    }

    private modifyPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const filters = { ...this.props.filters };

        const modifier = +event.currentTarget.value;
        const nextPage = this.props.filters.page + modifier;
        filters.page = nextPage > 0 && nextPage <= this.props.totalPages
            ? nextPage
            : this.props.filters.page;

        this.props.onChange(filters);
    }
}