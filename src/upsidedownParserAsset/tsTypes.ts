export interface CharSetJsonType{
    [key: string]:{
        before: string,
        after:  string
    }
}
export interface CharSetType{
    before: Array<string>,
    after:  Array<string>
}