import * as React from 'react';
import { IPlayer } from './IPlayer';


interface IProps {
    player: IPlayer;
}

export class PlayerMe extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }


    public render() {
        const { player } = this.props;

        return (
            <div id="player" className="bg-light mb-3 p-3">
                <div className="header">
                    <strong>{player.name}</strong>
                </div>
                <div className="container">
                    <div className="player-city">
                        <h3>City</h3>
                        <div>Treasury: {player.coins} <span className="fa fa-coins" /></div>
                        <div>Income: {player.cps} <span className="fa fa-coins" />/s</div>
                        <div>Cost: 100%</div>
                        <div>Build time: 100%</div>
                        <div>Defence: 110%</div>
                        <div>Training grounds: 1</div>
                        <div>
                            <button className="btn btn-primary">
                                <h5>Work</h5>
                                <div>Rewards: {player.citizens.workers / 5} <span className="fa fa-coins" /></div>
                            </button>

                            <button className="btn btn-info">
                                <h5>Upgrade</h5>
                                <div>Cost: {player.city.level * 100} <span className="fa fa-coins" /></div>
                                <div>Current Level: {player.city.level}</div>
                            </button>
                        </div>
                    </div>
                    <div className="player-army">
                        <h3>Army</h3>
                        <div>Soldiers: {player.army.soldiers} <span className="fa fa-chess-knight" /></div>
                        <div>Level: 1</div>
                        <div>Strength: 100%</div>

                        <button className="btn btn-primary">
                            <h5>Train</h5>
                            <div>Cost: 10 <span className="fa fa-coins" /> per <span className="fa fa-chess-knight" /></div>
                            <div className="production-container">
                                <div className="production-slot">Slot 1</div>
                                <div className="production-slot disabled">Slot 2</div>
                                <div className="production-slot disabled">Slot 3</div>
                            </div>
                        </button>

                        <button className="btn btn-info">
                            <h5>Upgrade Soldiers</h5>
                            <div>+10% Strength</div>
                            <div>Cost: 100 <span className="fa fa-coins" /></div>
                        </button>
                    </div>
                    <div className="player-citizens">
                        <h3>Citizens</h3>
                        <div>Workers: {player.citizens.workers} <span className="fa fa-chess-pawn" /></div>
                        <div>Level: 1</div>
                        <div>Efficiency: 100%</div>

                        <button className="btn btn-primary">
                            <h5>Hire</h5>
                            <div>Cost: 5 <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" /></div>
                            <div className="production-container">
                                <div className="production-slot">Slot 1</div>
                                <div className="production-slot disabled">Slot 2</div>
                                <div className="production-slot disabled">Slot 3</div>
                            </div>
                        </button>

                        <button className="btn btn-info">
                            <h5>Upgrade Workers</h5>
                            <div>+5% Efficiency</div>
                            <div>Cost: 100 <span className="fa fa-coins" /></div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

{/* <div className="bg-light mb-3 p-3">
    <h4>Player</h4>
    <div className={'p-3 player card text-center' + (me.army.soldiers <= 0 ? ' bg-danger' : '')}>
        <h3>{me.name} - {me.army.soldiers} <span className="fa fa-chess-knight" /> - {me.citizens.workers} <span className="fa fa-chess-pawn" /> - {me.coins} <span className="fa fa-coins" /> <small>@{me.cps} coins/s</small></h3>
        <div className="card-text">
            <div>
                <WorkButton player={me} />
            </div>
            <div>
                <ShopButton player={me} item={SHOP[0]} amount={1} />
                <ShopButton player={me} item={SHOP[0]} amount={10} />
                <ShopButton player={me} item={SHOP[0]} amount={100} />
            </div>
            <div>
                <ShopButton player={me} item={SHOP[1]} amount={1} />
                <ShopButton player={me} item={SHOP[1]} amount={10} />
                <ShopButton player={me} item={SHOP[1]} amount={100} />
            </div>

            <hr />
            <h4>Cheats</h4>
            <button className="btn btn-warning" onClick={() => me.cheatInCoins(10)}>+10 <span className="fa fa-coins" /></button>
            <button className="btn btn-warning" onClick={() => me.cheatInCoins(100)}>+100 <span className="fa fa-coins" /></button>
            <button className="btn btn-warning" onClick={() => me.cheatInCoins(1000)}>+1000 <span className="fa fa-coins" /></button>
            <br />

        </div>
    </div>
</div> */}