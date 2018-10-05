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



const PLAYER_ME = 5;
const PLAYER_START_SOLDIERS = 10;
const PLAYERS: IPlayer[] = [
    { id: 1, name: 'computer 1', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS },
    { id: 2, name: 'computer 2', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS },
    { id: 3, name: 'computer 3', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS },
    { id: 4, name: 'computer 4', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS },
    { id: 5, name: 'cato', coins: 0, cps: 1, soldiers: PLAYER_START_SOLDIERS },
];
const ITEMS: IItem[] = [
    { id: 1, name: 'Soldier', cost: 10 }
];

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
}

interface IState {
    timer: number;
    players: IPlayer[]
}

export class Ticker extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            timer: 0,
            players: PLAYERS
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

                <div className="bg-danger mb-3 p-2">
                    <button className="btn btn-warning" onClick={() => this.cheat(10)}>+10 coins</button>
                    <button className="btn btn-warning" onClick={() => this.cheat(100)}>+100 coins</button>
                </div>

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
                                            <button className="btn btn-success" onClick={() => this.buy(player, 1, 1)}>1 soldier <br/><small>Cost: 10 coins</small></button>
                                            <button className="btn btn-success" onClick={() => this.buy(player, 1, 10)}>10 soldiers <br/><small>Cost: 100 coins</small></button>
                                            <button className="btn btn-success" onClick={() => this.buy(player, 1, 100)}>100 soldiers <br/><small>Cost: 1000 coins</small></button>
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
            if (p.soldiers <= 0) {
                console.log(`${p.name} is dead!`);
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
            if (p.id === player.id) {
                p.coins += 1;
            }
            return p;
        });

        this.setState({ players });
    }

    private buy = (player: IPlayer, itemId: number, amount: number) => {
        const item = ITEMS.find(p => p.id === itemId);
        if (item !== undefined) {
            const cost = item.cost * amount;

            const players = this.state.players.map(p => {
                if (p.id === player.id && p.coins > cost) {
                    console.log(`${player.name} bought ${amount}x ${item.name} for ${cost} coins`);
                    p.coins -= cost;
                    p.soldiers += amount;
                }
                return p;
            });

            this.setState({ players });
        }
    }

    private attack = (player: IPlayer, soldierCount: number) => {
        const players = this.state.players.map(p => {
            if (p.id === player.id && p.soldiers > 0) {
                p.soldiers -= soldierCount;
            }

            if (p.id === PLAYER_ME && p.soldiers > 1) {
                p.soldiers -= soldierCount
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

    
}