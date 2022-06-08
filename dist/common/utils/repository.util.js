"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromDto = void 0;
function getFromDto(dto, data, fields) {
    let properties;
    if (fields && fields.length) {
        properties = fields;
    }
    else {
        properties = Object.keys(dto);
    }
    properties.forEach((property) => {
        data[property] = dto[property];
    });
    return data;
}
exports.getFromDto = getFromDto;
//# sourceMappingURL=repository.util.js.map