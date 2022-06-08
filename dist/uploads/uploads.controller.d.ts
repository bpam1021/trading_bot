import UploadsService from "./uploads.service";
export default class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadedFile(file: any): Promise<{
        originalname: any;
        filename: any;
    }>;
    uploadMultipleFiles(files: any): Promise<any[]>;
    seeUploadedFile(filepath: any, res: any): any;
}
