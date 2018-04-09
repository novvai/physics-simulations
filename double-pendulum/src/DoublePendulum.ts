import { Vector } from "../vendor/Vector";

export class DoublePendulum {
    private pos: Vector;
    private posMid: Vector;
    private posEnd: Vector;
    private length: number;

    private angle: number;
    private angleTwo: number;
    private angleVelOne: number = 0;
    private angleVelTwo: number = 0;
    private angleAcOne: number = 0;
    private angleAcTwo: number = 0;
    private gravity = 0.1337;
    private massOne: number = 5;
    private massTwo: number = 5;

    constructor(posV: Vector, length: number, angle: number) {
        this.pos = posV;
        this.length = length;
        this.angle = angle*2.1;
        this.angleTwo = angle * 3;
    }

    private calculateEnd(context: any) {
        let firstEq = -this.gravity * (2 * this.massOne + this.massTwo) * Math.sin(this.angle);
        let secondEq = -this.massTwo * this.gravity * Math.sin(this.angle - 2 * this.angleTwo);
        let thirdEq = -2 * Math.sin(this.angle - this.angleTwo) * this.massTwo * (this.angleVelTwo * this.angleVelTwo * this.length + this.angleVelOne * this.angleVelOne * this.length * Math.cos(this.angle - this.angleTwo));
        let underFirst = this.length * (2 * this.massOne + this.massTwo - this.massTwo * Math.cos(2 * this.angle - 2 * this.angleTwo));

        this.angleAcOne = (firstEq + secondEq + thirdEq) / underFirst;

        let sFirstEq = 2 * Math.sin(this.angle - this.angleTwo);
        let sSecondEq = this.angleVelOne * this.angleVelOne * this.length * (this.massOne + this.massTwo);
        let sThirdEq = this.gravity * (this.massOne + this.massTwo) * Math.cos(this.angle);
        let sFourthEq = this.angleVelTwo * this.angleVelTwo * this.length * this.massTwo * Math.cos(this.angle - this.angleTwo);
        let sUnder = this.length * (2 * this.massOne + this.massTwo - this.massTwo * Math.cos(2 * this.angle - 2 * this.angleTwo));

  
        this.angleAcTwo =( sFirstEq * (sSecondEq + sThirdEq + sFourthEq)) /sUnder;
      

        this.angleVelOne += this.angleAcOne;
        this.angleVelTwo += this.angleAcTwo;

        this.angle += this.angleVelOne;
        this.angleTwo += this.angleVelTwo;

        /**friction */
        // this.angle*=0.99;
        // this.angleTwo*=0.99;
        let dx = this.length * Math.sin(this.angle);
        let dy = this.length * Math.cos(this.angle);

        let dxE = this.length * Math.sin(this.angleTwo);
        let dyE = this.length * Math.cos(this.angleTwo);

        let mid = new Vector(dx, dy);
        let end = new Vector(dxE, dyE);

        mid.setMagnitude(this.length);
        end.setMagnitude(this.length);

        this.posMid = Vector.add(this.pos, mid);
        this.posEnd = Vector.add(this.posMid, end);
    }

    /**
     * display
     */
    public display(context: any) {
        this.calculateEnd(context);

        context.lineTo(this.pos.x, this.pos.y, this.posMid.x, this.posMid.y)
            .lineTo(this.posMid.x, this.posMid.y, this.posEnd.x, this.posEnd.y)
            .dot(this.posEnd.x, this.posEnd.y);
    }
}