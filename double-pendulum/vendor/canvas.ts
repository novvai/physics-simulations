export abstract class Canvas {
    public element: HTMLElement | null;
    public context: CanvasRenderingContext2D | null;
    public canvas: HTMLElement | null;
    protected mouseX: number;
    protected mouseY: number;
    protected width: number;
    protected height: number;
    protected frames: number
        = 60;
    protected anim: number;

    constructor(elId: string, width: number, height: number) {
        this.element = <HTMLElement>document.getElementById(elId);
        this.width = width;
        this.height = height;
        this.createCanvas(width, height);
        this.setAnimation();
    }

    protected setFrames(fr: number) {
        this.frames = fr;
        this.resetAnimation();
    }

    private resetAnimation() {
        clearInterval(this.anim);
        this.setAnimation();
    }


    private createCanvas(width: number, height: number): void {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", `${width}`);
        canvas.setAttribute("height", `${height}`);
        canvas.setAttribute("style", `border:1px solid #000000`);
        let context = canvas.getContext("2d")

        this.element!.appendChild(canvas);

        this.context = context;
        this.canvas = canvas;

        this.context!.translate(this.width / 2, this.height / 2)

        this.canvas!.addEventListener("mousemove", e => {
            this.mouseX = e.clientX - this.width / 2 - 10;
            this.mouseY = e.clientY - this.height / 2 - 10;
        })
    }

    private setAnimation(): void {
        this.anim = setInterval(() => {
            this.draw();
        }, 1000 / this.frames)
    }

    protected lineTo(fromX:number, fromY:number, toX:number, toY:number): this {
        this.context!.beginPath();
        this.context!.moveTo(fromX, fromY);
        this.context!.lineTo(toX, toY);
        this.context!.stroke();

        return this;
    }
    protected dot(x: number, y: number): this {
        this.context!.beginPath();
        this.context!.arc(x,y, 5, 0, Math.PI*2);
        this.context!.stroke();

        return this;
    }
    protected clear(){
        this.context!.clearRect(-this.width/2, -this.height/2, this.width*2, this.height*2);
    }
    protected abstract draw(): void
}
