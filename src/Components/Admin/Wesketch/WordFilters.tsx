import * as React from 'react';

interface IProps {
    totalPages: number;
    onChange: (filters: string) => void;
}

interface IState {
    q: string;
    difficulties: number[];
    languages: number[];
    page: number;
}

export class WordFilters extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            q: '',
            difficulties: [],
            languages: [],
            page: 1
        };
    }

    public render() {
        return (
            <div className="filters">
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="filter-languages btn-group mr-3">
                        <button type="button"
                            value="1"
                            className={"btn" + (this.state.languages.includes(1) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleLanguage}>English</button>
                        <button type="button"
                            value="2"
                            className={"btn" + (this.state.languages.includes(2) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleLanguage}>Norwegian</button>
                    </div>

                    <div className="filter-difficulties btn-group mr-3">
                        <button type="button"
                            value="1"
                            className={"btn" + (this.state.difficulties.includes(1) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Easy</button>
                        <button type="button"
                            value="2"
                            className={"btn" + (this.state.difficulties.includes(2) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Normal</button>
                        <button type="button"
                            value="3"
                            className={"btn" + (this.state.difficulties.includes(3) ? ' btn-primary' : ' btn-secondary')}
                            onClick={this.toggleDifficulty}>Hard</button>
                    </div>

                    <div className="input-group mr-3">
                        <input className="form-control" type="text" name="q" placeholder="Search words"
                            value={this.state.q}
                            onChange={this.onFieldValueChange}
                            onKeyUp={this.onKeyUpSearch}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </div>


                    <button className="btn btn-dark"
                        value="-1"
                        onClick={this.modifyPage}><span className="fa fa-caret-left" />
                    </button>
                    <button className="btn btn-dark"
                        value="1"
                        onClick={this.modifyPage}><span className="fa fa-caret-right" />
                    </button>
                </form>
            </div>
        );
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.updateFilters();
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(nextState);
    }

    private onKeyUpSearch = (event: React.KeyboardEvent<any>) => {
        event.preventDefault();
        if (event.which === 13 || this.state.q.length <= 0) {
            this.updateFilters();
        }
    }

    private toggleDifficulty = (event: React.MouseEvent<HTMLButtonElement>) => {
        const difficulty = +event.currentTarget.value;
        const difficulties = this.state.difficulties.includes(difficulty)
            ? this.state.difficulties.filter(p => p !== difficulty)
            : this.state.difficulties.concat(difficulty);

        this.setState({ difficulties, page: 1 }, () => this.updateFilters());
    }

    private toggleLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const language = +event.currentTarget.value;
        const languages = this.state.languages.includes(language)
            ? this.state.languages.filter(p => p !== language)
            : this.state.languages.concat(language);

        this.setState({ languages, page: 1 }, () => this.updateFilters());
    }

    private modifyPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const pageModifier = +event.currentTarget.value;
        const nextPage = this.state.page + pageModifier;
        const page = nextPage > 0 && nextPage <= this.props.totalPages
            ? nextPage
            : this.state.page;

        this.setState({ page }, () => this.updateFilters());
    }

    private updateFilters = () => {
        const filters = `?q=${this.state.q}&difficulties=${this.state.difficulties}&languages=${this.state.languages}&page=${this.state.page}`;
        this.props.onChange(filters);
    }
}