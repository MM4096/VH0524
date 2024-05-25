class BodyCalibration {
    constructor(body_name, body_size, objects) {
        this.body_name = body_name
        this.body_size = body_size
        this.objects = objects
    }
}

class GameObject {
    constructor(name, size, position) {
        this.name = name
        this.size = size
        this.position = position
    }
}