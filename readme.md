
<div align="center">
  
# AltJS：Upsidedown.js
  
  <img src="https://github.com/mmzspr/upsidedownjs/assets/30862527/23da4289-2bb9-4585-ae5b-380bb2385730" width="200">
</div>

<br>

Upsidedown.jsとは実行可能な上下逆さまのJavaScriptです。拡張子は **`.sɾ`**  
Upsidedown.jsは、Peg.jsで実装したパーサーで抽象構文木（ESTree）に変換し、EscodegenでJavaScriptに変換して実行します。
### FizzBuzz.sɾ
```
                                   { 
              ;( ᴉ )ᵷoꞁ˙ǝꞁosuoɔ    
                             {    
                ;ǝnuᴉʇuoɔ        
    ;( „zzᴉℲ„ )ᵷoꞁ˙ǝꞁosuoɔ        
          } ( 0 === Ɛ % ᴉ ) ɟᴉ    
                             {    
                ;ǝnuᴉʇuoɔ        
    ;( „zznꓭ„ )ᵷoꞁ˙ǝꞁosuoɔ        
          } ( 0 === ϛ % ᴉ ) ɟᴉ
                             {    
                ;ǝnuᴉʇuoɔ        
;( „zznꓭzzᴉℲ„ )ᵷoꞁ˙ǝꞁosuoɔ        
          } ( 0 === ϛƖ % ᴉ )ɟᴉ    
 } ( ++ ᴉ ;xɐɯ => ᴉ ;Ɩ = ᴉ ʇǝꞁ )ɹoɟ
　　                ;ϛƖ = xɐɯ ʇsuoɔ
                     ;„ʇɔᴉɹʇs ǝsn„
```

## 仕様
### 対応する文字
|言語|文字|
|-|-|
|JavaScript|0123456789^?!&()[]{},.><_"'/|
|Upsidedown.js|0ƖᘔƐ߈ϛ9Ɫ86v¿¡⅋)(][}{❛˙<>‾„,\\"|

### データ型
#### 文字列型
- „„で文字を囲む
- 例：„¡¡pꞁɹoM oꞁꞁǝH„
#### 数値型
- 例：0ᘔ0ᘔ , ϛ9Ɛ
### 演算子
#### 代入演算子
- =
#### 二項演算子
- === , == , =¡ , ==¡ , >> , > , <<< , << , < , => , =< , +  , - , * , \\ , % , | , v , ⅋ , uᴉ
### 変数
- 予約語は不可
-  末尾に数字は使用できない
- ɹɐʌ, ʇǝꞁ, ʇsuoɔ で宣言可能
- ❛で区切ってまとめて宣言可能
### 出力
- `;()ᵷoꞁ˙ǝꞁosuoɔ`
- 例：`;(„pꞁɹoM ¡oꞁǝH„)ᵷoꞁ˙ǝꞁosuoɔ`
### ɟᴉ文
- 条件がtrueならば実行
- 中括弧は省略不可
- else表記は未対応
```
 　　　　　　　　  　　{
;(„ǝnɹʇ„)ᵷoꞁ˙ǝꞁosuoɔ
　　　　  　　} ( ɐ ) ɟᴉ
```
### ɹoɟ文
- for文形式のループ
- 中括弧は省略不可

```
                          {
        ;(ᴉ)ᵷoꞁ˙ǝꞁosuoɔ
}(++ᴉ ;0Ɩ > ᴉ ;0 = ᴉ ʇǝꞁ)ɹoɟ
```
### ǝꞁᴉɥʍ文
- 条件が true のときループ
- 中括弧は省略不可
```
                     {
           ;++ᴉ
              {
    ;ʞɐǝɹq
} ( 0Ɩ < ᴉ ) ɟᴉ
        } ( ᴉ ) ǝꞁᴉɥʍ
```
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
