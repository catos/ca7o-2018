import * as React from 'react';
import { IPlayer, Player } from './Player';
import { Ai } from './Ai';
// import * as moment from 'moment';

/**
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
    new Player(1, 'Computer 1', true),
    new Player(2, 'Computer 2', true),
    new Player(3, 'Computer 3', true),
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
            <div className="m-3">

                <div className="mb-3">
                    <div>stopGame: {this.state.stopGame.toString()}</div>
                    <div>now: {this.state.now}</div>
                    <div>dt: {this.state.dt}</div>
                    <div>last: {this.state.last}</div>
                    <div>step: {this.state.step}</div>

                    <div>ticks: {this.state.ticks}</div>
                    <div>Gametime (ms): {}</div>
                    <button className="btn btn-primary" onClick={this.startGame}>Start Game</button>
                    <button className="btn btn-primary" onClick={this.stopGame}>Stop Game</button>
                </div>

                <div className="bg-light mb-3 p-3">
                    <h4>Opponents</h4>
                    <div className="card-deck">
                        {opponents.map((player, idx) =>
                            <div key={idx} className={'player card text-center' + (player.soldiers <= 0 ? ' border border-danger' : '')}>
                                <h3>{player.name} {player.isDead ? 'R.I.P' : ''} {player.isComputer ? '[AI]' : ''}</h3>
                                <h4>{player.soldiers} soldiers</h4>
                                <h5>{player.coins} coins</h5>
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
                        <div className={'player card text-center' + (me.soldiers <= 0 ? ' bg-danger' : '')}>
                            <h3>{me.name}</h3>
                            <h4>{me.soldiers} soldiers</h4>
                            <h5>{me.coins} coins</h5>
                            <h6>@{me.cps} coins/s</h6>
                            <div className="card-text">
                                <div>
                                    <button className="btn btn-primary" onClick={() => me.work()}>Work</button>
                                </div>
                                <div>
                                    <button className="btn btn-success" onClick={() => me.buy(1, 1)}>1 soldier <br /><small>Cost: 10 coins</small></button>
                                    <button className="btn btn-success" onClick={() => me.buy(1, 10)}>10 soldiers <br /><small>Cost: 100 coins</small></button>
                                    <button className="btn btn-success" onClick={() => me.buy(1, 100)}>100 soldiers <br /><small>Cost: 1000 coins</small></button>
                                </div>
                                <div>
                                    <h4>Cheats</h4>
                                    <button className="btn btn-warning" onClick={() => me.cheatInCoins(10)}>+10 coins</button>
                                    <button className="btn btn-warning" onClick={() => me.cheatInCoins(100)}>+100 coins</button>
                                    <button className="btn btn-warning" onClick={() => me.cheatInCoins(1000)}>+1000 coins</button>
                                </div>
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

        // // check if game over
        // const gameIsOver = this.state.players.filter(p => !p.isDead).length <= 1;
        // if (gameIsOver) {
        //     this.log('GAME OVER!');
        //     clearInterval(this.intervalId);
        // }

        gs.now = this.timestamp();
        gs.dt += Math.min(1000, (gs.now - gs.last));

        while (gs.dt > gs.step) {
            gs.dt = gs.dt - gs.step;
            gs.ticks += 1;

            // update
            gs.players = this.state.players.map(p => {
                p.isComputer
                    ? new Ai().update(p, gs.dt)
                    : p.update(gs.dt);

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