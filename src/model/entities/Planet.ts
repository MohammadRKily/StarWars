import CommonModel from "../CommonModel"

export default interface Planet extends CommonModel {
    planet: string
    climate: string
    terrain: string
    population: number
}

