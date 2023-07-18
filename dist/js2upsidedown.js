"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
// 出力設定
const exportDir = path.resolve(__dirname, "./upsidedownJs"); // ディレクトリ
const exportExtension = "sɾ"; // 拡張子
// 文字列の横幅測定用
const pixelWidth = require('string-pixel-width');
const pixelWidthConfig = {
    font: 'Arial',
    size: 16
};
// インデント調整用係数
const WhiteWidthRate = 0.7;
// 文字変換用の文字セットファイル
const USDCharSetJsonPath = path.resolve(__dirname, './upsidedownParserAsset/charSet.json');
// =========================
//     main関数
// =========================
async function main() {
    // エラー処理
    const inputPath = process.argv[2];
    if (typeof inputPath !== "string") {
        console.error("変換するファイルまたはフォルダを入力してください。");
        process.exit(1);
    }
    // 読み込むファイルリスト生成
    const fileList = await makeFileList(inputPath);
    // 出力先ディレクトリ生成
    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
    }
    for (const file of fileList) {
        // ファイル読み込み
        const text = loadFile(file);
        // 変換
        const usdTxt = JsToUpsidedown.convert(text);
        // 出力
        const exportFileName = path.parse(file).name;
        const exportPath = path.resolve(exportDir, `./${exportFileName}.${exportExtension}`);
        fs.writeFileSync(exportPath, usdTxt, 'utf8');
        console.log(`generate: ${exportFileName}.${exportExtension}`);
    }
}
// =========================
//     ファイル読み込み関連
// =========================
// 読み込むファイルのリスト生成
async function makeFileList(inputPath) {
    let result = [];
    // エラー処理
    if (!fs.existsSync(inputPath)) {
        console.log(`File or folder not found: ${inputPath}`);
        process.exit(1);
    }
    if (fs.statSync(inputPath).isDirectory()) {
        // ディレクトリパスの場合
        const filenames = await fs.promises.readdir(inputPath);
        for (const filename of filenames) {
            result.push(path.resolve(inputPath, filename));
        }
    }
    else {
        // ファイルパスの場合
        result.push(inputPath);
    }
    return result;
}
// ファイル読み込み
function loadFile(file) {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        process.exit(1);
    }
    return fs.readFileSync(file, 'utf8');
}
// =========================
//     変換用クラス
// =========================
class JsToUpsidedown {
    // メイン処理
    static convert(text) {
        // 逆順へ
        const reversedText = this.#reverseTxt(this.#replaceNewlineChar(text));
        // 文字を置換
        const upsidedownText = this.#toUpsidedown(reversedText);
        // インデント処理
        const result = this.#format(upsidedownText);
        return result;
    }
    // 改行文字をそろえる
    static #replaceNewlineChar(text) {
        return text.replace(/\r\n|\r/g, "\n");
    }
    // 文字列を逆順へ
    static #reverseTxt(text) {
        return text.split("").reverse().join("");
    }
    // 逆さ文字で置換
    static #toUpsidedown(text) {
        let result = [];
        const charSet = this.#laodCharSet();
        for (const c of text.split("")) {
            const index = charSet.afterText.indexOf(c);
            if (index + 1) {
                result.push(charSet.beforeText[index]);
            }
            else {
                result.push(c);
            }
        }
        return result.join("");
    }
    // 設定ファイル読み込み
    static #laodCharSet() {
        let result = {
            afterText: [],
            beforeText: []
        };
        const text = loadFile(USDCharSetJsonPath);
        const json = JSON.parse(text);
        for (const value of Object.values(json)) {
            result.afterText = [...result.afterText, ...value.after.split("")];
            result.beforeText = [...result.beforeText, ...value.before.split("")];
        }
        return result;
    }
    // 半角空白で左を埋めて各行の横幅を揃える
    static #format(usdTxt) {
        const whiteWidth = pixelWidth(" ", pixelWidthConfig);
        const usdLines = usdTxt.split("\n");
        const maxWidth = this.#getMaxWidth(usdLines);
        for (let i = 0; i < usdLines.length; i++) {
            const width = pixelWidth(usdLines[i], pixelWidthConfig);
            const diffWidth = (maxWidth - width) * WhiteWidthRate;
            const whiteNum = Math.round(diffWidth / whiteWidth);
            usdLines[i] = " ".repeat(whiteNum) + usdLines[i];
        }
        const result = usdLines.join("\n");
        return result;
    }
    // 配列の中から最長の横幅を返す
    static #getMaxWidth(lines) {
        let result = 0;
        for (const line of lines) {
            const width = pixelWidth(line, pixelWidthConfig);
            result = width > result ? width : result;
        }
        return result;
    }
}
main();
