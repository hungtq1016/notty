export type TFolder = {
    title : string;
    slug : string;
    authorId : string;
    imageId : string | null;
    groupId : string | null;
    image : TImage | null;
    group : TGroup ;
}

export type TImage = {
    id : string;
    url : string;
    alt : string;
}

export type TGroup = {
    id : string;
    name : string;
}

export type TDynamic<T> = {
    [key:string]: T
}