import * as React from 'react';


/**
 * 
 * Convert 10 villagers to soldiers
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

const PLAYER_ME = 5;
const PLAYER_START_SOLDIERS = 10;
const PLAYERS: IPlayer[] = [
    { id: 1, name: 'computer 1', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS, isDead: false },
    { id: 2, name: 'computer 2', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS, isDead: false },
    { id: 3, name: 'computer 3', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS, isDead: false },
    { id: 4, name: 'computer 4', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS, isDead: false },
    { id: 5, name: 'cato', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS, isDead: false },
];
const SHOP: IItem[] = [
    { id: 1, name: 'Soldier', cost: 10 }
];

/*** INTERFACES ***/

interface IItem {
    id: number;
    name: string;
    cost: number;
}

interface IPlayer {
    id: number;
    name: string;
    coins: number;
    cps: number;
    soldiers: number;
    isDead: boolean;
}

interface IState {
    timer: number;
    players: IPlayer[],
    log: string[]
}

/*** COMPONENT ***/

export class Ticker extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            timer: 0,
            players: PLAYERS,
            log: []
        };
    }

    public componentDidMount() {
        setInterval(this.loop, 1000);
    }

    public render() {
        const { timer, players } = this.state;

        return (
            <div className="m-3">

                <div className="mb-3">
                    <div>Timer: {timer}</div>
                </div>

                <div className="bg-light mb-3 p-2">
                    <h4>Cheats</h4>
                    <button className="btn btn-warning" onClick={() => this.cheat(10)}>+10 coins</button>
                    <button className="btn btn-warning" onClick={() => this.cheat(100)}>+100 coins</button>
                    <button className="btn btn-warning" onClick={() => this.cheat(1000)}>+1000 coins</button>
                </div>

                <div className="bg-light mb-3 p-2">
                    <h4>Players</h4>
                    <div className="card-deck">
                        {players.map((player, idx) =>
                            <div key={idx} className={'player card text-center' + (player.soldiers <= 0 ? ' bg-danger' : '')}>
                                <h3>{player.name}</h3>
                                <h4>{player.soldiers} soldiers</h4>
                                <h5>{player.coins} coins @ {player.cps} coins / s</h5>
                                <div className="card-text">
                                    {player.id === PLAYER_ME
                                        ? <div>
                                            <div>
                                                <button className="btn btn-primary" onClick={() => this.tick(player)}>Work</button>
                                            </div>
                                            <div>
                                                <button className="btn btn-success" onClick={() => this.buy(player, 1, 1)}>1 soldier <br /><small>Cost: 10 coins</small></button>
                                                <button className="btn btn-success" onClick={() => this.buy(player, 1, 10)}>10 soldiers <br /><small>Cost: 100 coins</small></button>
                                                <button className="btn btn-success" onClick={() => this.buy(player, 1, 100)}>100 soldiers <br /><small>Cost: 1000 coins</small></button>
                                            </div>
                                        </div>
                                        : <div>
                                            <button className="btn btn-danger" onClick={() => this.attack(player, 1)}>Attack + 1</button>
                                            <button className="btn btn-danger" onClick={() => this.attack(player, 10)}>Attack + 10</button>
                                            <button className="btn btn-danger" onClick={() => this.attack(player, 100)}>Attack + 100</button>
                                        </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-light mb-3 p-2">
                    <h4>Log</h4>
                    {this.state.log.map((item, idx) => <div key={idx}>{item}</div>)}
                </div>

            </div>
        );
    }

    private loop = () => {
        // const { players } = this.state;

        // update player ticks
        const players = this.state.players.map(p => {
            p.cps = Math.floor(p.soldiers / 10);
            p.coins += p.cps;

            return p;
        });

        // check if player is dead
        players.map(p => {
            if (p.soldiers <= 0 && !p.isDead) {
                this.log(`${p.name} died!`);
                p.isDead = true;
            }
            return p;
        })

        // update state        
        this.setState({
            timer: this.state.timer + 1,
            players
        });
    }

    private tick = (player: IPlayer) => {
        const players = this.state.players.map(p => {
            if (p.id === player.id && !p.isDead) {
                p.coins += 1;
            }
            return p;
        });

        this.setState({ players });
    }

    private buy = (player: IPlayer, itemId: number, amount: number) => {
        const item = SHOP.find(p => p.id === itemId);
        if (item !== undefined) {
            const cost = item.cost * amount;

            const players = this.state.players.map(p => {
                if (p.id === player.id && p.coins > cost) {
                    this.log(`${player.name} bought ${amount}x ${item.name} for ${cost} coins`);
                    p.coins -= cost;
                    p.soldiers += amount;
                }
                return p;
            });

            this.setState({ players });
        }
    }

    private attack = (player: IPlayer, attackCount: number) => {
        const players = this.state.players.map(p => {
            if (p.id === player.id && !p.isDead) {
                attackCount = attackCount > p.soldiers ? p.soldiers : attackCount;
                p.soldiers -= attackCount;
            }

            if (p.id === PLAYER_ME && p.soldiers > 1) {
                p.soldiers -= attackCount
            }

            return p;
        });

        this.setState({ players });
    }

    private cheat = (coins: number) => {
        const players = this.state.players.map(p => {
            if (p.id === PLAYER_ME) {
                p.coins += coins
            }

            return p;
        });

        this.setState({ players });
    }

    /*** HELPERS */
    private log = (message: string) => {
        const log = [...this.state.log];
        log.push(message);
        this.setState({ log });
    }

}