import * as React from 'react';
// import { WesketchService, IWesketchEvent, WesketchEventType } from './WesketchService';
import { TEST_DRAWINGS } from './TestDrawings';
import { WesketchService } from './WesketchService';
import { IDrawing } from './IDrawing';
import { CarouselItem, CarouselCaption, Carousel, CarouselControl } from 'reactstrap';

interface IProps {
    wss: WesketchService;
}

interface IState {
    drawings: IDrawing[];
    activeIndex: number;
    animating: boolean;
}

export class Drawings extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            drawings: TEST_DRAWINGS,
            activeIndex: 0,
            animating: false
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    public componentDidMount() {
        // Watch events
        // this.props.wss.on('event', this.onEvent);
    }

    public render() {
        const { activeIndex, drawings } = this.state;
        const slides = drawings.map((drawing, idx) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={idx}
                >
                    <img src={drawing.data} alt={drawing.word} />
                    <CarouselCaption captionText={drawing.player} captionHeader={drawing.word} />
                </CarouselItem>
            );
        });

        return (
            <div id="drawings">
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    {/* <CarouselIndicators items={drawings} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        );
    }

    private onExiting() {
        this.setState({ animating: true });
    }

    private onExited() {
        this.setState({ animating: false });
    }

    private next() {
        const { drawings } = this.state;
        if (this.state.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === drawings.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    private previous() {
        const { drawings } = this.state;
        if (this.state.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === 0 ? drawings.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    private goToIndex(newIndex: number) {
        if (this.state.animating) {
            return;
        }
        this.setState({ activeIndex: newIndex });
    }

    // private onEvent = (event: IWesketchEvent) => {
    //     if (event.type === WesketchEventType.GetDrawings) {
    //         const drawings = event.value;
    //         this.setState({ drawings });
    //     }
    // }
}