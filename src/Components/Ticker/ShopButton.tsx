import * as React from "react";
import { IPlayer } from "./IPlayer";
import { IItem } from "./Shop";

interface IProps {
    player: IPlayer;
    item: IItem;
    amount: number;
}

interface IState {
    cost: number;
    discount: number;
    timeRemaining: number;
    isCrafting: boolean;
}

/**
 * Discount
 * 1x        0%
 * 10x      10%
 * 100x     20%
 */

export class ShopButton extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        const { item, amount } = this.props;

        const discount = Math.floor(amount / 10);

        this.state = {
            cost: item.cost * amount * (100 - discount) / 100,
            discount,
            timeRemaining: item.craftingTime * amount,
            isCrafting: false
        };
    }

    public render() {
        const { item } = this.props;
        const { cost, discount } = this.state;

        return (
            <button className={'btn' + (this.btnStateClass())} onClick={this.onClick}>
                {item.name} x{this.props.amount}
                <div><small><span className="fa fa-coins" /> {cost} {discount > 0 ? `(${discount}%)` : ''}</small></div>
                <div><small><span className="fa fa-hourglass" /> {this.state.timeRemaining / 1000} s</small></div>
            </button>
        );
    }

    private btnStateClass = () => {
        if (this.state.isCrafting) {
            return ' btn-secondary';
        }

        if (this.props.player.coins < this.state.cost) {
            return ' btn-danger'
        }

        return ' btn-success';
    }

    private onClick = () => {
        const { player, item, amount } = this.props;
        const { cost } = this.state;

        // player is already crafting
        if (this.state.isCrafting) {
            return;
        }

        // player cannot afford to buy
        if (player.coins <= cost) {
            return;
        }

        // cash up front
        console.log(`${player.name} ordered ${amount}x ${item.name} for ${cost} coins`);
        player.coins -= cost;

        // start order / craft
        this.craft(() => {
            player.soldiers += amount;
            console.log(`${amount} ${item.name} get!`);

            this.setState({
                timeRemaining: item.craftingTime * amount,
                isCrafting: false
            });
        });
    }


    private craft = (callback: () => void) => {
        this.setState({ isCrafting: true });

        const intervalId = setInterval(() => {
            this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1000 }),
                () => {
                    if (this.state.timeRemaining <= 0) {
                        clearInterval(intervalId);
                        callback();
                    }
                });
        }, 1000);
    }
}