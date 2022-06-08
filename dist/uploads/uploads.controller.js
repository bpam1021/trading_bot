"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uploads_service_1 = require("./uploads.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("./utils/file-upload.utils");
let UploadsController = class UploadsController {
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async uploadMultipleFiles(files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }
    seeUploadedFile(filepath, res) {
        return res.sendFile(filepath, { root: './files' });
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: "Upload single file" }),
    swagger_1.ApiResponse({
        status: 200,
        description: "The upload record",
    }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './files',
            filename: file_upload_utils_1.editFileName,
        })
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadedFile", null);
__decorate([
    common_1.Post('multiple'),
    swagger_1.ApiOperation({ summary: "Upload multiple files" }),
    swagger_1.ApiResponse({
        status: 200,
        description: "The upload mutliple record",
    }),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('file', 20, {
        storage: multer_1.diskStorage({
            destination: './files',
            filename: file_upload_utils_1.editFileName,
        })
    })),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadMultipleFiles", null);
__decorate([
    common_1.Get(':filepath'),
    swagger_1.ApiOperation({ summary: "Get file" }),
    swagger_1.ApiResponse({
        status: 200,
        description: "The found file record",
    }),
    __param(0, common_1.Param('filepath')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "seeUploadedFile", null);
UploadsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags("Uploads"),
    common_1.Controller("uploads"),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [uploads_service_1.default])
], UploadsController);
exports.default = UploadsController;
//# sourceMappingURL=uploads.controller.js.map