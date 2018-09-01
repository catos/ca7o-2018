import * as React from "react";
import { Jumbotron, Button } from "reactstrap";

export class Home extends React.Component {
    public render() {
        return (
            <div className="m-4">
                <Jumbotron>
                    <h1 className="display-3">Velkommen!</h1>
                    <p className="lead">Hvis du ønsker å hjelpe til så er det kjempefint om du kan registrere feil og mangler eller nye features du ønsker på denne <a href="https://github.com/catos/ca7o/issues">siden</a>.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Denne knappen gjør ikke noe</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}