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
        const pages = Array.from(Array(this.props.totalPages), (_, x) => x + 1);
        console.log(pages);

        return (
            <div>
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

                {this.props.totalPages > 1
                    ? <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            {pages.map((page, idx) =>
                                <li key={idx} className="page-item"><a className="page-link" href="#" onClick={() => this.setPage(page)}>{page}</a></li>
                            )}

                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                    : ''}
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

    private toggleDifficulty = (difficulty: number) => {

        const difficulties = this.state.difficulties.includes(difficulty)
            ? this.state.difficulties.filter(p => p !== difficulty)
            : this.state.difficulties.concat(difficulty);

        this.setState({ difficulties }, () => this.updateFilters());
    }

    private toggleLanguage = (language: number) => {

        const languages = this.state.languages.includes(language)
            ? this.state.languages.filter(p => p !== language)
            : this.state.languages.concat(language);

        this.setState({ languages }, () => this.updateFilters());
    }

    private setPage = (page: number) => {
        this.setState({ page }, () => this.updateFilters());
    }

    private updateFilters = () => {
        const filters = `?q=${this.state.q}&difficulties=${this.state.difficulties}&languages=${this.state.languages}&page=${this.state.page}`;
        this.props.onChange(filters);
    }
}