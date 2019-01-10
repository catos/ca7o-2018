import { Vector2 } from "../Wesketch/Painter/Vector2";

export class CanvasUI {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private scale: Vector2;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = new Vector2(4, 4);

        const cuiClick = new Event('cui-clic2k');
        this.canvas.addEventListener('click', (event) => {
            const mousePos = new Vector2(
                event.clientX - this.canvas.getBoundingClientRect().left,
                event.clientY - this.canvas.getBoundingClientRect().top + window.scrollY);

            console.log('canvasui->click', mousePos);

            this.canvas.dispatchEvent(cuiClick);

        }, false);

    }

    public button = (x: number, y: number, text: string, onClick: () => void, w: number = 100, h: number = 25) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x / this.scale.x, y / this.scale.y, w / this.scale.x, h / this.scale.y);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        const fontSize = h - 4;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x + w / 2, y + h / 2, w - 10);
        this.ctx.stroke();

        this.canvas.addEventListener('cui-click', () => {

            console.log('cui-click');
            
            // console.log(`btn click @${mousePos.x}-${mousePos.y}, x: ${x}, w: ${w}, y: ${y}, h: ${h}`);
            // if (mousePos.x >= x && mousePos.x <= x + w && mousePos.y >= y && mousePos.y <= y + h) {
            //     onClick();
            // }
        });

    }

    public pixel = (x: number, y: number) => {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.fillStyle = '#000000';

        this.ctx.fillRect(x / this.scale.x, y / this.scale.y, 1, 1);
        this.ctx.stroke();
    }

    public label = (x: number, y: number, text: string) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = `9px serif`;
        // this.ctx.textAlign = 'center';
        // this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x, y);
        this.ctx.stroke();
    }
}