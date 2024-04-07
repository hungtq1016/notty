export type TFolder = {
    id : string;
    title : string;
    slug : string;
    authorId : string;
    imageId : string | null;
    groupId : string | null;
    image : TImage | null;
    group : TGroup ;
    files : TFile[];
}

export type TFile = {
    id? : string;
    name : string;
    slug : string;
    folderId : string;
    folder? : TFolder;
    notes? : TNote[];
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

export type TNote = {
    id? : string;
    title : string;
    content : string;
    createdAt? : string;
    updatedAt? : string;
    color: string;
    prioritize : boolean;
    fileId? : string;
}

export type TDynamic<T> = {
    [key:string]: T
}
export type TQuery = {
    [key:string]: string | number | undefined
}
export type TUser = {
    id : string;
    name : string;
    email : string;
    emailVerified? : string;
    createdAt : string;
    updatedAt : string;
    accounts? : TAccount[];
    folders? : TFolder[];
    sessions? : TSession[];
    image? : string;
    imageId? : string;
    avatarId? : string;
    avatar? : TImage;
}

export type TAccount = {
    id : string;
    userId : string;
    type : string;
    provider : string;
    providerAccountId : string;
    refreshToken : string | null;
    accessToken : string | null;
    expiresAt : number | null;
    tokenType : string | null;
    scope : string | null;
    idToken : string | null;
    sessionState : string | null;
}

export type TSession = {
    id : string;
    sessionToken : string;
    userId : string;
    expires : string
    user : TUser;
}

