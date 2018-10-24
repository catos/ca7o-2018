import * as React from 'react';

interface IProps {
    onChange: (filters: string) => void;
}

interface IState {
    q: string;
    difficulties: number[];
    languages: number[];
}

export class WordFilters extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            q: '',
            difficulties: [],
            languages: []
        };
    }

    public render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.onSubmit}>
                <div className="filter-languages btn-group mr-3">
                    <button type="button" className={"btn" + (this.state.languages.includes(1) ? ' btn-primary' : ' btn-secondary')} onClick={() => this.toggleLanguage(1)}>English</button>
                    <button type="button" className={"btn" + (this.state.languages.includes(2) ? ' btn-primary' : ' btn-secondary')} onClick={() => this.toggleLanguage(2)}>Norwegian</button>
                </div>

                <div className="filter-difficulties btn-group mr-3">
                    <button type="button" className={"btn" + (this.state.difficulties.includes(1) ? ' btn-primary' : ' btn-secondary')} onClick={() => this.toggleDifficulty(1)}>Easy</button>
                    <button type="button" className={"btn" + (this.state.difficulties.includes(2) ? ' btn-primary' : ' btn-secondary')} onClick={() => this.toggleDifficulty(2)}>Normal</button>
                    <button type="button" className={"btn" + (this.state.difficulties.includes(3) ? ' btn-primary' : ' btn-secondary')} onClick={() => this.toggleDifficulty(3)}>Hard</button>
                </div>

                <div className="form-group mr-3">
                    <input className="form-control" type="text" name="q" placeholder="Search words"
                        value={this.state.q}
                        onChange={this.onFieldValueChange}
                        onKeyUp={this.onKeyUpSearch}
                    />
                </div>

                <button className="btn btn-primary" type="submit">Filter</button>
            </form>
        );
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const filters = `?q=${this.state.q}&difficulties=${this.state.difficulties}&languages=${this.state.languages}`;
        this.props.onChange(filters);
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
            // this.props.onChange();
        }
    }

    private toggleDifficulty = (difficulty: number) => {

        const difficulties = this.state.difficulties.includes(difficulty)
            ? this.state.difficulties.filter(p => p !== difficulty)
            : this.state.difficulties.concat(difficulty);

        this.setState({ difficulties }); // , () => this.props.onChange());
    }

    private toggleLanguage = (language: number) => {

        const languages = this.state.languages.includes(language)
            ? this.state.languages.filter(p => p !== language)
            : this.state.languages.concat(language);

        this.setState({ languages }); // , () => this.props.onChange());
    }


}