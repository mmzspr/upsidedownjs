{
  const path = require('path')
  const module = require(path.resolve(__dirname, './upsidedownParserAsset/module'));
}


start
  = program:instructions {return module.genProgram(program)}

// ==============================
//         構成要素
// ==============================

instructions = instructions:instruction* {return module.reverseInstructions(instructions)}

// 命令
instruction = _ instruction:(for / while / consoleLog / if / varDeclaration / block/ continue / break/ expressionStatement) _ {return instruction}

// 改行 & スペース
_ = (nextline / whitespace)* {return;}

// ==============================
//         スコープ
// ==============================
block = leftBracket instructions:instructions rightBracket {return module.genBlock(instructions)}

// ==============================
//         命令
// ==============================

// コンソール出力
// console.log("Hello World!");  
consoleLog = semicolon argumentList:functionCall consoleLogToken {return  module.genConsoleLog(argumentList);}

// if文
// { instruments } ( 0 === ϛƖ % ᴉ )ɟᴉ  
if = body:block _ leftParenthesis _ test:argument _ rightParenthesis _ ifToken {return  module.genIf(test, body);}

// for文
// {...} ( ++ ᴉ ;00Ɩ => ᴉ ;Ɩ = ᴉ ʇǝꞁ )ɹoɟ
for = body:block _ leftParenthesis _ update:expression? _ semicolon test:expression? _ init:(varDeclaration) _ rightParenthesis _  forToken {return module.genFor(init, test,update, body)}

// while文
while = body:block _ leftParenthesis _ test:expression _ rightParenthesis _ whileToken {return module.genWhile(test, body)};

break = semicolon breakToken {return module.genBreak()}

continue = semicolon continueToken {return module.genContinue()}

// 変数宣言
//;Ɩ = ᴉ ʇsuoɔ
varDeclaration = semicolon declarations:declarations _ kind:(varToken / constToken / letToken) {return module.genVarDeclaration(declarations, kind)}

// 宣言リスト
declarations = value:varDeclarator dataList:(_ comma _ varDeclarator)* {return module.makeList(value, dataList, 3)}

// 式
expressionStatement = semicolon expression:(expression / data) {return module.genExpressionStatement(expression)};

// 代入
// Ɩ = ᴉ 
varDeclarator = varDeclaratorInit:varDeclaratorInit? _ variable:variable {return module.genVarDeclarator(varDeclaratorInit, variable)}
varDeclaratorInit = expression:assignmentData _ assignmentOperator {return expression}
assignmentData = expressionWithoutAssignment / variable / data

// 引数リストを返す
functionCall = leftParenthesis _ value:argument _ dataList:(comma _ argument _)* rightParenthesis {return module.makeList(value, dataList, 2)}

// 引数
argument = expression / variable / data

// ==============================
//         型
// ==============================


data = numericalNumber / literal
// 数値
numericalNumber = value:$(number+) {return module.genNumLiteral(value)};
// 文字列
literal = quotation value:$((!quotation .)*) quotation {return module.genLiteral(value)}

// ==============================
//         式
// ==============================

// 式
expression = binaryExpression / assignmentExpression / updateExpression
// 式 (代入除外)
expressionWithoutAssignment = binaryExpression / updateExpression

// 二値演算
binaryExpression = left:term _ operator:binaryOperator _ right:(expression / term) {return module.genBinaryExpression(left, operator, right)}
// 代入演算
assignmentExpression = left:term _ operator:assignmentOperator _ right:(expression / term) {return module.genAssignmentExpression(left, operator, right)}
// インクリメント・デクリメント演算
updateExpression = updateExpressionLeft / updateExpressionRight
updateExpressionLeft = variable:variable _ operator:updateOperator {return module.genUpdateExpression(variable, operator, 1)}
updateExpressionRight = operator:updateOperator _ variable:variable {return module.genUpdateExpression(variable, operator, 0)}

// 項
term = variable / data

// 代入演算子
assignmentOperator = "="

// 二値演算子
binaryOperator = operator:$("===" / "==" / "=¡" / "==¡"
         / ">>" / ">" / "<<<" / "<<" / "<"
         / "=>" / "=<"
         / "+" / "-" / "*" / "\\" / "%"
         / "|" / "v" / "⅋" / "uᴉ") {return module.upsideDown(operator)}

// インクリメント・デクリメント演算
updateOperator = "++" / "--"

// ==============================
//         変数
// ==============================
variable = variable:$(number* alphabet)+  {return module.genVariable(variable)}

// ==============================
//         トークン定義
// ==============================
// 命令
consoleLogToken = "ᵷoꞁ˙ǝꞁosuoɔ"
ifToken = "ɟᴉ"
forToken = "ɹoɟ"
whileToken = "ǝꞁᴉɥʍ"
continueToken = "ǝnuᴉʇuoɔ"
breakToken = "ʞɐǝɹq"   
constToken = "ʇsuoɔ"
varToken = "ɹɐʌ"
letToken = "ʇǝꞁ"

// リテラル
alphabet = $(smallAlphabet / largeAlphabet)
smallAlphabet = $([ɐqɔpǝɟᵷɥᴉɾʞꞁɯuodbɹsʇnʌʍxʎz])
largeAlphabet = $([ⱯꓭƆᗡƎℲ⅁HIſʞ⅂WNOԀQᴚS⊥ᑎΛMX⅄Z])
number = $([0ƖᘔƐ߈ϛ9Ɫ86])
whitespace = [  ];
nextline = "\r\n" / "\n" / "\r"
quotation = "„"
comma = "❛"
leftParenthesis = "("
rightParenthesis = ")"
leftBracket = "{"
rightBracket = "}"
semicolon = ";"


