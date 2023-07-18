"use strict";
const fs = require('fs');
const path = require('path');
const peg = require("pegjs");
const escodegen = require("escodegen");
const parser = require(path.resolve(__dirname, './upsidedown-parser.js')); // 生成済みパーサ
const importExtension = "sɾ"; // altjs拡張子
main();
function main() {
    const filePath = process.argv[2];
    if (typeof filePath !== "string") {
        console.error(`実行する${importExtension}ファイルを入力してください。`);
        process.exit(1);
    }
    // altjs読み込み
    const upsidedownJs = loadUpsideDownJs(filePath);
    // 実行
    const result = parser.parse(upsidedownJs);
    const js = escodegen.generate(result);
    eval(js);
}
// altjs読み込み
function loadUpsideDownJs(filePath) {
    if (path.extname(filePath) !== `.${importExtension}`) {
        console.error(`不正な拡張です。${importExtension}ファイルを入力してください。`);
        process.exit(1);
    }
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        process.exit(1);
    }
    return fs.readFileSync(filePath, 'utf8');
}
