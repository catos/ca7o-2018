import * as React from 'react';
import { IPlayer } from './IPlayer';
import { Player } from './Player';
import { Ai } from './Ai';
import { ShopButton } from './ShopButton';
import { SHOP } from './Shop';
import { WorkButton } from './WorkButton';
// import * as moment from 'moment';

import './ticker.css';

/**
 * 
 * 1-100 soliders cost 10 per soldiers
 * 100-200 soliders cost 20 per soldiers
 * 200-300 soliders cost 30 per soldiers
 * 
 * City level +1, +2, +3: øker city defence med +1, +2 og +3.....dvs hvis motstander sender 10 soldater til angrep så mister han 1 pga defence
 * City levels gir også ekstra order/craft slots for soldiers og workers (som skal starte på 1)
 * Spiller begynner på City level +1
 * City level + gir bonus på pris of crafting-tid
 * Gevinsten for å upgrade city må være diminishing "mid-game" for å gi insentiver til å gå offensiv
 * 
 * 
 * Soldiers starter med en k/d ratio, kan trenes opp
 * Specialize to Medics som hindrer casualties
 * Hidden enemy info
 * Training takes time
 * Lord AI
 * Miners, farmers
 * Scout / spy
 * Civ-players-list-score
 * Unknown player until you reveal who it is....(with spy)
 * Defensive structures
 * Tech tree
 * Weapons & items
 * Lobby-phase, players choose starting soldiers, hookers and farmers
 * 10 soldiers pre hooks or bad morale
 * 
 */


/*** CONSTANTS ***/

const PLAYER_ME_ID = 4;
const PLAYERS: Player[] = [
    new Ai(1, 'Computer 1'),
    new Ai(2, 'Computer 2'),
    new Ai(3, 'Computer 3'),
    new Player(4, 'Cato')
];

/*** INTERFACES ***/

interface IState {
    stopGame: boolean;
    now: number;
    dt: number;
    last: number;
    step: number;
    ticks: number;
    players: IPlayer[],
    log: string[]
}

/*** COMPONENT ***/

export class Ticker extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            stopGame: true,
            now: Date.now(),
            dt: 0,
            last: 0,
            step: 1000,
            ticks: 0,
            players: PLAYERS,
            log: []
        };
    }

    public componentDidMount() {
        this.log('mount');
    }

    public render() {
        const { players } = this.state;

        const opponents = players.filter(p => p.id !== PLAYER_ME_ID);
        const me = players.find(p => p.id === PLAYER_ME_ID);

        if (me === undefined) {
            return;
        }

        return (
            <div id="ticker" className="m-3">

                <div className="header">
                    {this.state.stopGame
                        ? <button className="btn btn-success" onClick={this.startGame}>Start Game</button>
                        : <button className="btn btn-danger" onClick={this.stopGame}>Stop Game</button>}

                    <div>step: {this.state.step}</div>
                    <div>ticks: {this.state.ticks}</div>

                    <div>now: {Math.floor(this.state.now)}</div>
                    <div>dt: {Math.floor(this.state.dt)}</div>

                </div>

                <div className="bg-light mb-3 p-3">
                    <h4>Opponents</h4>
                    <div className="card-deck">
                        {opponents.map((player, idx) =>
                            <div key={idx} className={'p-3 card text-center border' + (player.isDead ? ' border-danger text-danger' : '')}>
                                <h3>{player.name} {player.isDead ? <span className="fa fa-skull" /> : ''} {player.isComputer ? '[AI]' : ''}</h3>
                                <h4>{player.soldiers} <span className="fa fa-chess-knight" /> - {player.workers} <span className="fa fa-chess-pawn" /> - {player.coins} coins <span className="fa fa-coins" /></h4>
                                <h6>@{player.cps} coins/s</h6>
                                <div className="card-text">
                                    <div>
                                        <button className="btn btn-danger" onClick={() => me.attack(player, 1)}>Attack</button>
                                        <button className="btn btn-danger" onClick={() => me.attack(player, 10)}>+10</button>
                                        <button className="btn btn-danger" onClick={() => me.attack(player, 100)}>+100</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-light mb-3 p-3">
                        <h4>Player</h4>
                        <div className={'p-3 player card text-center' + (me.soldiers <= 0 ? ' bg-danger' : '')}>
                            <h3>{me.name} - {me.soldiers} <span className="fa fa-shield-alt" /> - {me.workers} <span className="fa fa-chess-pawn" /> - {me.coins} <span className="fa fa-coins" /> <small>@{me.cps} coins/s</small></h3>
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
                    </div>

                </div>

                <div className="bg-light mb-3 p-3">
                    <h4>Log</h4>
                    {this.state.log.map((item, idx) => <div key={idx}>{item}</div>)}
                </div>

            </div>
        );
    }

    private loop = () => {
        const gs = { ...this.state };

        // check if game over
        const gameIsOver = this.state.players.filter(p => !p.isDead).length <= 1;
        if (gameIsOver) {
            this.log('GAME OVER!');
            this.stopGame();
        }

        gs.now = this.timestamp();
        gs.dt += Math.min(1000, (gs.now - gs.last));

        while (gs.dt > gs.step) {
            gs.dt = gs.dt - gs.step;
            gs.ticks += 1;

            // update
            gs.players = this.state.players.map(p => {
                p.update(gs.dt);
                return p;
            });
        }


        gs.last = gs.now;

        // update state
        this.setState({
            now: gs.now,
            dt: gs.dt,
            last: gs.last,
            ticks: gs.ticks,
            players: gs.players
        }, () => {
            if (!gs.stopGame) {
                requestAnimationFrame(this.loop);
            }
        });
    }

    private startGame = () => {
        this.setState({ stopGame: false }, () => requestAnimationFrame(this.loop));
    }

    private stopGame = () => {
        this.setState({ stopGame: true });
    }

    /*** HELPERS */
    private log = (message: string) => {
        const log = [...this.state.log];
        log.push(message);
        this.setState({ log });
    }

    private timestamp = () => {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

}