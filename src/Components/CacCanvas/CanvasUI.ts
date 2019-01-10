import { Vector2 } from "../Wesketch/Painter/Vector2";

export class CanvasUI {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    public button = (x: number, y: number, text: string, onClick: () => void, w: number = 100, h: number = 25) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(x, y, w, h);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        const fontSize = h - 4;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x + w / 2, y + h / 2, w - 10);
        this.ctx.stroke();

        this.canvas.addEventListener('click', (event) => {
            const mousePos = new Vector2(
                event.clientX - this.canvas.getBoundingClientRect().left,
                event.clientY - this.canvas.getBoundingClientRect().top + window.scrollY);

            console.log(`btn click @${mousePos.x}-${mousePos.y}, x: ${x}, w: ${w}, y: ${y}, h: ${h}`);
            if (mousePos.x >= x && mousePos.x <= x + w && mousePos.y >= y && mousePos.y <= y + h) {
                console.log('click on button!');
                onClick();
            }
        }, false);

    }

    public label = (x: number, y: number, text: string) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = `12px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x, y);
        this.ctx.stroke();
    }
}