import { Vector } from "../vendor/Vector";

export class Segment {
    private pos: Vector;
    private posEnd: Vector;
    private length: number;

    private angle: number;
    private angleVel: number = 0;
    private angleAc: number = 0;

    constructor(posV: Vector, length: number, angle:number) {
        this.pos = posV;
        this.length = length;
        this.angle = angle;
    }

    private calculateEnd(context: any) {
        this.angleAc = -0.005 * Math.sin(this.angle);
        this.angleVel += this.angleAc;
        this.angle += this.angleVel;
        this.angle *= 0.99;

        let dx = this.length * Math.sin(this.angle);
        let dy = this.length * Math.cos(this.angle);
        let end = new Vector(dx, dy);

        end.setMagnitude(this.length);

        this.posEnd = Vector.add(this.pos, end);
    }
    
    /**
     * display
     */
    public display(context: any) {
        this.calculateEnd(context);

        context.lineTo(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y).dot(this.posEnd.x, this.posEnd.y);
    }
}