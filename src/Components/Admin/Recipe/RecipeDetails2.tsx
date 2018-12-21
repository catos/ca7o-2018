import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { newRecipeTemplateString } from './NewRecipeTemplateString';

interface IProps extends RouteComponentProps<any> { }

interface IState {
    // recipe: IRecipe;
    recipe: string;
    // redirect: boolean;
}


export class RecipeDetails2 extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            recipe: newRecipeTemplateString
        };
    }

    public render() {
        return (
            <div className="recipe-details m-4">
                <h1>Details 2 - Betterer</h1>

                <div className="editor">
                    <label>Recipe</label>
                    <textarea id="wysiwyg" name="recipe-text" value={this.state.recipe} onChange={this.onFieldValueChange} />
                    <button className="btn btn-primary" onClick={this.save}>Save</button>
                </div>
            </div>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextState = {
            ...this.state,
            recipe: event.target.value
        };
        this.setState(nextState);
    }

    private save = () => {

        const recipe = this.parseRecipeText(this.state.recipe);
        console.log('save!', this.state.recipe);
        console.log(recipe);

    }

    private parseRecipeText = (text: string) => {
        const recipe = {
            name: '',
            tags: [''],
            thumbnail: 'http://',
            url: 'http://',
            description: 'lorem ipsum',
            time: 30,
            ingredients: [
                { quantity: 1, unit: 'gr', name: 'blabla', type: 1 }
            ]
        };
        const textLines = text.split('\n');

        textLines.forEach(p => {
            if (p.indexOf('# Navn:') > -1) {
                recipe.name = p.replace('# Navn:', '').trim();
            }

            if (p.indexOf('# Bildelenke:') > -1) {
                recipe.thumbnail = p.replace('# Bildelenke:', '').trim();
            }

            if (p.indexOf('# Tags:') > -1) {
                // TODO: split separate tags
                recipe.tags = p.replace('# Tags:', '').trim().split(',') as string[];
            }

            if (p.indexOf('# Beskrivelse:') > -1) {
                recipe.description = p.replace('# Beskrivelse:', '').trim();
            }

            if (p.indexOf('# Ekstern lenke:') > -1) {
                recipe.url = p.replace('# Ekstern lenke:', '').trim();
            }

            if (p.indexOf('# Tid (i minutter):') > -1) {
                recipe.time = +p.replace('# Tid (i minutter):', '').trim();
            }
        });
        // console.log();        
        // console.log('Navn', text.indexOf('# Navn: '), '# Navn: '.length);
        // console.log('Bildelenke', text.indexOf('# Bildelenke: '), '# Bildelenke: '.length);

        return recipe;
    }
}