import { Canvas } from "../vendor/canvas";
import { Vector } from "../vendor/Vector";
import { Segment } from "./Segment";

export class Environment extends Canvas {
    public mouseV: Vector;
    private segment:Segment;
    private dots : Array<Vector> = [];

    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.setFrames(60);
        this.mouseV = new Vector(0,0)
        this.setUp();
    }
    
    private setUp() {
        this.segment = new Segment(new Vector(), 80, Math.PI/2);
    }
    /*
     * Display
     */
    protected draw() {
        this.clear()
        if(
            this.mouseX && this.mouseY
        ){ this.mouseV.x = this.mouseX;
        this.mouseV.y = this.mouseY;
        }   
        
        this.segment.display(this);
    }
}