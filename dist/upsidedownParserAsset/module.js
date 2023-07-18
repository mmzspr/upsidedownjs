"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genProgram = exports.genVariable = exports.genUpdateExpression = exports.genAssignmentExpression = exports.genBinaryExpression = exports.genVarDeclarator = exports.genLiteral = exports.genNumLiteral = exports.genVarDeclaration = exports.genExpressionStatement = exports.genBreak = exports.genContinue = exports.genWhile = exports.genFor = exports.genIf = exports.genConsoleLog = exports.genBlock = exports.reverseInstructions = exports.makeList = exports.upsideDown = void 0;
const { UpsidedownText } = require("./UpsidedownText");
// ==============================
//         汎用
// ==============================
function upsideDown(value) {
    return UpsidedownText.convert(value);
}
exports.upsideDown = upsideDown;
function makeList(value, dataList, index) {
    let result = [value];
    for (const data of dataList) {
        result.push(data[index]);
    }
    result = result.reverse(); // 反転
    return result;
}
exports.makeList = makeList;
// ==============================
//         構成要素
// ==============================
function reverseInstructions(instructions) {
    return instructions.reverse();
}
exports.reverseInstructions = reverseInstructions;
// ==============================
//         スコープ
// ==============================
function genBlock(instructions) {
    return {
        type: 'BlockStatement',
        body: instructions
    };
}
exports.genBlock = genBlock;
// ==============================
//         命令
// ==============================
function genConsoleLog(argumentList) {
    return {
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'console' },
                computed: false,
                property: { type: 'Identifier', name: 'log' }
            },
            arguments: argumentList
        }
    };
}
exports.genConsoleLog = genConsoleLog;
function genIf(test, body) {
    return {
        type: 'IfStatement',
        test: test,
        consequent: body,
        alternate: null
    };
}
exports.genIf = genIf;
function genFor(init, test, update, body) {
    return {
        type: "ForStatement",
        init: init,
        test: test,
        update: update,
        body: body
    };
}
exports.genFor = genFor;
function genWhile(test, body) {
    return {
        type: "WhileStatement",
        test: test,
        body: body
    };
}
exports.genWhile = genWhile;
function genContinue() {
    return {
        type: "ContinueStatement",
        label: null
    };
}
exports.genContinue = genContinue;
function genBreak() {
    return {
        type: "BreakStatement",
        label: null
    };
}
exports.genBreak = genBreak;
function genExpressionStatement(expression) {
    return {
        type: 'ExpressionStatement',
        expression: expression
    };
}
exports.genExpressionStatement = genExpressionStatement;
function genVarDeclaration(declarations, rawKind) {
    const kind = UpsidedownText.convert(rawKind);
    return {
        type: 'VariableDeclaration',
        kind: kind,
        declarations: declarations
    };
}
exports.genVarDeclaration = genVarDeclaration;
// ==============================
//         型
// ==============================
function genNumLiteral(rawValue) {
    const value = UpsidedownText.convert(rawValue);
    return {
        type: 'Literal',
        value: Number(value)
    };
}
exports.genNumLiteral = genNumLiteral;
function genLiteral(rawValue) {
    const value = UpsidedownText.convert(rawValue);
    return {
        type: 'Literal',
        value: value
    };
}
exports.genLiteral = genLiteral;
// ==============================
//         式
// ==============================
function genVarDeclarator(varDeclaratorInit, variable) {
    return {
        type: 'VariableDeclarator',
        id: variable,
        init: varDeclaratorInit
    };
}
exports.genVarDeclarator = genVarDeclarator;
function genBinaryExpression(left, operator, right) {
    return {
        type: 'BinaryExpression',
        left: right,
        right: left,
        operator: operator
    };
}
exports.genBinaryExpression = genBinaryExpression;
function genAssignmentExpression(left, operator, right) {
    return {
        type: 'AssignmentExpression',
        left: right,
        right: left,
        operator: operator
    };
}
exports.genAssignmentExpression = genAssignmentExpression;
function genUpdateExpression(argument, operator, prefix) {
    return {
        type: 'UpdateExpression',
        argument: argument,
        operator: operator,
        prefix: prefix
    };
}
exports.genUpdateExpression = genUpdateExpression;
// ==============================
//         変数
// ==============================
function genVariable(rawName) {
    const name = UpsidedownText.convert(rawName);
    return {
        type: 'Identifier',
        name: name
    };
}
exports.genVariable = genVariable;
// ==============================
//         文字定義
// ==============================
function genProgram(body) {
    return {
        type: 'Program',
        sourceType: 'module',
        body: body
    };
}
exports.genProgram = genProgram;
