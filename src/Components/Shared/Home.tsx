import * as React from "react";

export class Home extends React.Component {
    public render() {
        return (
            <div className="front-page">

                <article className="promoted">
                    <h1 className="display-3">Velkommen!</h1>
                    <p className="lead">Hvis du ønsker å hjelpe til så er det kjempefint om du kan registrere feil og mangler eller nye features <a href="https://github.com/catos/ca7o/issues">her</a>.</p>
                </article>

                <article>
                    <h2>MDK (Min Digitale Kokebok)</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi adipisci numquam quis temporibus enim ipsam ducimus beatae cumque assumenda nihil, quo velit repellendus, perferendis consectetur quas eaque accusamus magni quidem.</p>
                </article>

                <article>
                    <h2>Wesketch</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime distinctio placeat velit molestias? Repellendus ab quibusdam pariatur, neque, praesentium vitae voluptatum velit reprehenderit quo nobis enim distinctio quis aliquid facere.</p>
                </article>

                <article>
                    <h2>Ticker</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, dignissimos exercitationem eius suscipit facere pariatur? Impedit adipisci nobis deserunt modi, aspernatur perspiciatis ratione aperiam illo vel, repudiandae, excepturi explicabo maiores.</p>
                </article>

            </div>
        );
    }
}