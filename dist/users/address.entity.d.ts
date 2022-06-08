import User from './user.entity';
declare class Address {
    id: number;
    street: string;
    city: string;
    country: string;
    user?: User;
}
export default Address;
