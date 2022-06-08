"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search_Limit_Count = exports.UserState = exports.Gender = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SuperAdmin"] = "SUPER_ADMIN";
    UserRole["Admin"] = "ADMIN";
    UserRole["Moderator"] = "MODERATOR";
    UserRole["Customer"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var Gender;
(function (Gender) {
    Gender["Man"] = "Man";
    Gender["Woman"] = "Woman";
})(Gender = exports.Gender || (exports.Gender = {}));
var UserState;
(function (UserState) {
    UserState[UserState["PENDING"] = 0] = "PENDING";
    UserState[UserState["NORMAL"] = 1] = "NORMAL";
    UserState[UserState["SUSPEND"] = 2] = "SUSPEND";
    UserState[UserState["DELETED"] = 9] = "DELETED";
})(UserState = exports.UserState || (exports.UserState = {}));
exports.Search_Limit_Count = '18';
//# sourceMappingURL=index.js.map