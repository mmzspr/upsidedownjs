import exp from "constants";

const {UpsidedownText} = require("./UpsidedownText");

// ==============================
//         汎用
// ==============================
export function upsideDown(value:string){
  return UpsidedownText.convert(value);
}
export function makeList(value: string, dataList: string, index: number) {
  let result = [value];
  for(const data of dataList) {
    result.push(data[index]);
  }
  result = result.reverse();// 反転
  return result;
}

// ==============================
//         構成要素
// ==============================
export function reverseInstructions(instructions: Array<any>){
  return instructions.reverse();
}

// ==============================
//         スコープ
// ==============================
export function genBlock(instructions: Array<any>){
  return {
    type: 'BlockStatement',
    body: instructions
  }
}
// ==============================
//         命令
// ==============================
export function genConsoleLog(argumentList: Array<{type:string, value:string}>){
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

export function genIf(test:any, body:Array<any>){
  return {
    type: 'IfStatement',
    test: test,
    consequent: body,
    alternate: null
  }
}

export function genFor(init:any, test:any, update:any,body:any){
  return {
    type: "ForStatement",
    init: init,
    test: test,
    update: update,
    body: body
  }
}

export function genWhile(test:any, body:any){
  return {
    type: "WhileStatement",
    test: test,
    body: body
  }
}

export function genContinue(){
  return {
    type: "ContinueStatement",
    label: null
  }
}

export function genBreak(){
  return {
    type: "BreakStatement",
    label: null
  }
}

export function genExpressionStatement(expression:any){
  return {
    type: 'ExpressionStatement',
      expression: expression
  }

}
export function genVarDeclaration(declarations: any, rawKind: any){
  const kind =  UpsidedownText.convert(rawKind);
  return {
    type: 'VariableDeclaration',
    kind: kind,
    declarations: declarations
  }
}


// ==============================
//         型
// ==============================
export function genNumLiteral(rawValue: string){
  const value = UpsidedownText.convert(rawValue);
  return { 
    type: 'Literal',
    value: Number(value)
  };
}

export function genLiteral(rawValue: string){
  const value = UpsidedownText.convert(rawValue);
  return { 
    type: 'Literal',
    value: value
  };
}

// ==============================
//         式
// ==============================
export function genVarDeclarator(varDeclaratorInit:any, variable:any){
  return {
    type: 'VariableDeclarator',
    id: variable,
    init: varDeclaratorInit
  }
}


export function genBinaryExpression(left:any, operator:any, right:any){
  return {
    type: 'BinaryExpression',
    left: right,
    right: left,
    operator: operator
  }
}

export function genAssignmentExpression(left:any, operator:any, right:any){
  return {
    type: 'AssignmentExpression',
    left: right,
    right: left,
    operator: operator
  }
}

export function genUpdateExpression(argument:any, operator:any, prefix:any){
  return {
    type: 'UpdateExpression',
    argument:argument,
    operator: operator,
    prefix:prefix
  }
}

// ==============================
//         変数
// ==============================

export function genVariable(rawName: string){
  const name = UpsidedownText.convert(rawName);
  return {
    type: 'Identifier',
    name: name
  }
}

// ==============================
//         文字定義
// ==============================

export function genProgram(body: Array<any>){
  return {
    type: 'Program',
    sourceType: 'module',
    body: body
  }
}



