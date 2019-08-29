import CommonModel from "../CommonModel"

export default interface Vehicle extends CommonModel {
    manufacturer: string
    name: string
    model: string
    length: number
    height: number
    max_atmosphering_speed: number
    crew: number
    passengers:number
    vehicle_class:string
}

