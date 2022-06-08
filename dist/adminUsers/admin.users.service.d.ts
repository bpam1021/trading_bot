export declare type User = any;
export declare class AdminUsersService {
    private readonly users;
    constructor();
    findOne(username: string): Promise<User | undefined>;
}
