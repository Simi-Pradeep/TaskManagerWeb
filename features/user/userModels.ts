export class User {
    _id: string | null = null;
    username: string | null = null;
    password: string | null = null;
    fullName: string | null = null;
}

export interface UserInput {
    username: string | null;
    password: string | null;
    fullName?: string | null;
}
