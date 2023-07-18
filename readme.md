# AltJS：Upsidedown.js

## 動作確認済み環境
- Ubuntu22.04
  - node v18.12.1 (npm v8.19.2)
- Windiws11
  - node v16.17.0 (npm v8.15.0)


## Ubuntuでの実行方法
### 初期設定 
- パッケージインストール  
`npm install`
- Upsidedown.jsの生成  
`node dist/js2upsidedown.js dist/sampleJs`

### Upsidedown.jsの実行方法
- `node dist/main.js [Upsidedown.jsのファイルパス]`

- Hello World  
  `node dist/main.js dist/upsidedownJs/hello.sɾ`
- FizzBuzz  
  `node dist/main.js dist/upsidedownJs/fizzbuzz.sɾ`



## Upsidedown.js の生成方法
- JavaScript から Upsidedown.js を生成できます。出力先は dist/upsidedownJs です。  
`node dist/js2upsidedown.js [jsまたはjsが格納されたディレクトリのパス]`
- 例：`node dist/js2upsidedown.js dist/sampleJs`



## ファイル構成
### ./dist ディレクトリ
- main.js  
    Upsidedown.js を JavaScriptに変換・実行するプログラム。
- upsidedown.pegjs  
    Upsidedown.jsの構文規則ファイル
- upsidedown-parser.js  
    構文規則ファイルから生成されたパーサー
- /upsidedownParserAsset  
    構文規則・パーサー関連ファイル格納ディレクトリ
- js2upsidedown.js 
    JavaScriptをUpsidedown.js に変換するプログラム
- /upsidedownJs  
    Upsidedown.jsのソースコード格納ディレクトリ
- /sampleJs  
    JavaScriptのソースコードディレクトリ（Upsidedown.js生成で利用）


### ./src ディレクトリ
-- TypeScriptファイルなどが格納された実行フェイル生成用ディレクトリ



## 実行用ファイル（./dist）の生成 
- `npm run build`
