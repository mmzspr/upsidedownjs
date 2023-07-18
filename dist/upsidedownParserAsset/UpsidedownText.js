"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsidedownText = void 0;
const path = require("path");
const fs = require("fs");
// =========================
//     変換用クラス
// =========================
class UpsidedownText {
    static #charSetPath = path.resolve(__dirname, './charSet.json');
    static #charSet = UpsidedownText.#laodCharSet();
    // メイン処理
    static convert(text) {
        // 逆順へ
        const reversedText = this.#reverseTxt(this.#replaceNewlineChar(text));
        // 文字を置換
        const result = this.#toUpsidedown(reversedText);
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
        for (const c of text.split("")) {
            const index = this.#charSet.before.indexOf(c);
            if (index + 1) {
                result.push(this.#charSet.after[index]);
            }
            else {
                result.push(c);
            }
        }
        return result.join("");
    }
    // =========================
    //     ファイル読み込み関連
    // =========================
    static #laodCharSet() {
        let result = {
            before: [],
            after: []
        };
        const text = this.#loadFile(this.#charSetPath);
        const json = JSON.parse(text);
        for (const key of Object.keys(json)) {
            const before = json[key].before.split("");
            const after = json[key].after.split("");
            result.before = result.before.concat(before);
            result.after = result.after.concat(after);
        }
        return result;
    }
    // ファイル読み込み
    static #loadFile(file) {
        if (!fs.existsSync(file)) {
            console.log(`File not found: ${file}`);
            process.exit(1);
        }
        return fs.readFileSync(file, 'utf8');
    }
}
exports.UpsidedownText = UpsidedownText;
