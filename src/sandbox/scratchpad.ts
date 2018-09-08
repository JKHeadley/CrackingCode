type Point = {
    x: number;
    y: number;
    distance(other: Point): number;
}

type Shape = {
    area(): number
}

type Perimeter = {
    perimeter(): number
}

type RectangleShape = Partial<Shape & Perimeter> & Point

type StrictRectangle = Shape & Perimeter & Point

class PointImplementation implements Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distance(other: Point): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}

const PointFactory = (x: number, y: number): RectangleShape => {

    return {
        x,
        y,
        distance: function (other: Point) {
            return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2))
        },
    }
}

const point1 = new PointImplementation(3, 4);
const point2 = PointFactory(3, 4);

point1.x = 4
point2.x = 4
console.log(point1.distance(new PointImplementation(5, 5)))
console.log(point2.distance(new PointImplementation(5, 5)))