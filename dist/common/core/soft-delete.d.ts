import { CommonDto } from '../dtos/common.dto';
export declare class SoftDelete {
    id: string;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
    toDto(): CommonDto;
}
