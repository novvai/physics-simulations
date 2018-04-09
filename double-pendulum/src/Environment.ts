import { Canvas } from "../vendor/canvas";
import { Vector } from "../vendor/Vector";
import { DoublePendulum } from "./DoublePendulum";

export class Environment extends Canvas {
    private doublePendulum:DoublePendulum;

    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.setFrames(60);
        this.setUp();
    }
    
    private setUp() {
        this.doublePendulum = new DoublePendulum(new Vector(), 80, Math.PI/2);
    }
    /*
     * Display
     */
    protected draw() {
        this.clear()
        
        this.doublePendulum.display(this);
    }
}