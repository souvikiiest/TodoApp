"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoneTodo = exports.UpdateTodo = exports.addTodo = exports.GetTodo = exports.findUser = exports.CheckUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(userName, firstName, lastName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.create({
            data: {
                userName,
                password,
                firstName,
                lastName,
            },
        });
        return response;
    });
}
exports.createUser = createUser;
//CHECK IF USER EXISTS
function CheckUser(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findFirst({
            where: {
                userName,
            },
        });
        return response;
    });
}
exports.CheckUser = CheckUser;
//END OF CHECK USER
function findUser(userName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findFirst({
            where: {
                userName,
                password,
            },
            select: {
                firstName: true,
                lastName: true,
                id: true,
            },
        });
        return response;
    });
}
exports.findUser = findUser;
function GetTodo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todos.findMany({
            where: {
                userId,
            },
            select: {
                title: true,
                description: true,
                done: true,
                Todoid: true,
            },
        });
        return response;
    });
}
exports.GetTodo = GetTodo;
function addTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todos.create({
            data: {
                userId,
                title,
                description,
            },
        });
        return response;
    });
}
exports.addTodo = addTodo;
function UpdateTodo(Todoid, title, description, isdelete) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isdelete) {
            const responseUp = yield prisma.todos.delete({
                where: {
                    Todoid,
                },
            });
            return responseUp;
        }
        else {
            const responseUp = yield prisma.todos.update({
                data: {
                    title,
                    description,
                },
                where: {
                    Todoid,
                },
            });
            return responseUp;
        }
    });
}
exports.UpdateTodo = UpdateTodo;
function DoneTodo(Todoid) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseUp = yield prisma.todos.update({
            data: {
                done: true,
            },
            where: {
                Todoid,
            },
        });
        return responseUp;
    });
}
exports.DoneTodo = DoneTodo;
