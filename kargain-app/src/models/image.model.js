export default class ImageModel {
    constructor (raw) {
        this.raw = raw
    }

    get getRaw () {
        return this.raw
    }

    get getName () {
        return this.raw?.originalName
    }

    get getLocation () {
        return this.raw?.location ?? '/images/car-placeholder.jpg'
    }

    get getTile () {
        return this.raw?.originalName
    }
}
