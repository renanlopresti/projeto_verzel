export enum USER_ROLES {
 ADMIN = "ADMIN",
 NORMAL = "NORMAL"
}

export interface authenticationData {
 id: string,
 role: USER_ROLES
}

export interface user {
 id: string,
 email: string,
 name: string,
 password: string,
 role: USER_ROLES
}

export interface module {
 id: string,
 name: string
}

export interface classRoom {
 id: string,
 name: string,
 date:string,
 id_modules:string
}