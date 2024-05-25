class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(operand) {
        return new Vector2(this.x + operand.x, this.y + operand.y)
    }

    subtract(operand) {
        return new Vector2(this.x - operand.x, this.y - operand.y)
    }

    multiply(operand) {
        return new Vector2(this.x * operand, this.y * operand)
    }

    divide(operand) {
        return this.multiply(1 / operand)
    }
}