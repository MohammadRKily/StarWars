import CommonModel from "../CommonModel"

export default interface Starship extends CommonModel {
    model: string
    manufacturer: string
    name: string
    crew: number
    cargo_capacity: number
    
   
}

