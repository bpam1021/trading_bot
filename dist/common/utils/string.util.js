"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitName = exports.enumToLabel = exports.extractEmailFromString = exports.concatStringArray = exports.generateRandomPassword = void 0;
exports.generateRandomPassword = (min = 10, max = 20) => {
    const passwordChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/';
    const randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array(randPwLen).fill(passwordChars).map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
    }).join('');
};
exports.concatStringArray = (data) => {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        result += data[i];
        if (i != data.length - 1) {
            result += ', ';
        }
    }
    return result;
};
function extractEmailFromString(text) {
    const start = text.indexOf('<') + 1;
    const end = text.indexOf('>');
    if (end === -1) {
        return text;
    }
    return text.slice(start, end);
}
exports.extractEmailFromString = extractEmailFromString;
function enumToLabel(enumValue) {
    const source = String(enumValue);
    if (source === '') {
        return '';
    }
    return source.split('_').map(item => {
        const labelItem = item.toLowerCase();
        return labelItem[0].toUpperCase() + labelItem.slice(1);
    }).join(' ');
}
exports.enumToLabel = enumToLabel;
function splitName(fullName) {
    if (!fullName) {
        return ['', ''];
    }
    fullName = fullName.trim().replace(/\s\s+/g, ' ');
    const names = fullName.split(' ');
    if (names.length === 1) {
        return ['', names[0]];
    }
    const lastName = names[names.length - 1];
    const firstName = names.slice(0, names.length - 1).join(' ');
    return [firstName, lastName];
}
exports.splitName = splitName;
//# sourceMappingURL=string.util.js.map