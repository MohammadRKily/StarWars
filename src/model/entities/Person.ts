import CommonModel from "../CommonModel"

export default interface Person extends CommonModel {
    name: string
    birth_year: string
    gender: string
    height: number
    makerPercentage: number
    skin_color: string,
    films:string [],
    homeworld: string
   
}

