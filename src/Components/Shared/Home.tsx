import * as React from "react";

export class Home extends React.Component {
    public render() {
        return (
            <div className="container home">
                {/* <div className="row">
                    <div className="col-md-12">
                        <article>
                            <h1>ca7o.com</h1>
                            <p className="lead">Atque mollitia cum iusto suscipit? Porro nihil necessitatibus in voluptatem, voluptate veritatis illum est architecto! Sapiente quod quia nisi facere, nobis doloremque.</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam hic itaque explicabo porro in cum doloribus, voluptatum aliquam eligendi. Quae officiis dolorum aliquam nam assumenda repudiandae nulla magnam perspiciatis aut.</p>
                        </article>
                    </div>
                </div> */}
                <h1>ca7o.com</h1>
                <p className="lead">Atque mollitia cum iusto suscipit? Porro nihil necessitatibus in voluptatem, voluptate veritatis illum est architecto! Sapiente quod quia nisi facere, nobis doloremque.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam hic itaque explicabo porro in cum doloribus, voluptatum aliquam eligendi. Quae officiis dolorum aliquam nam assumenda repudiandae nulla magnam perspiciatis aut.</p>

                <div className="row">
                    <div className="col-md-4">
                        <article>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHORnbIuq_wqqY5GMKxzBIiPazjdt_OxDvwIQ8Eo0BIyF2cv6zBw" alt="Wesketch" />
                            <h2>Wesketch</h2>
                            <p className="lead">Hvis du ønsker å hjelpe til så er det kjempefint om du kan registrere feil og mangler eller nye features <a href="https://github.com/catos/ca7o/issues">her</a>.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime distinctio placeat velit molestias? Repellendus ab quibusdam pariatur, neque, praesentium vitae voluptatum velit reprehenderit quo nobis enim distinctio quis aliquid facere.</p>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article>
                            <img src="https://unixtitan.net/images/castle-clipart-germany-6.png" alt="Cities and Castles" />
                            <h2>Cities and Castles</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <p>Sed, dignissimos exercitationem eius suscipit facere pariatur? Impedit adipisci nobis deserunt modi, aspernatur perspiciatis ratione aperiam illo vel, repudiandae, excepturi explicabo maiores.</p>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article>
                            <h2>MBG</h2>
                            <div className="lead">Lagnam fugit repellat asperiores recusandae quidem necessitatibus!</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis blanditiis, minus fugit incidunt cumque obcaecati ad! Vel nostrum quae dolorum atque repudiandae et, ad ex placeat eum harum iste nam.</p>
                        </article>
                        <article>
                            <h2>MDK</h2>
                            <div className="lead">Min Digitale Kokebok</div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi adipisci numquam quis temporibus enim ipsam ducimus beatae cumque assumenda nihil, quo velit repellendus, perferendis consectetur quas eaque accusamus magni quidem.</p>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}