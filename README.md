# Nuxt firebase Monorepo

## GitFlow

mainブランチは直接マージしない
pull request  を送るようにする。

## 構成

- Packages
  - front: フロントアプリケーション
  - admin: 管理側
  - function: cloud functions
  - core: 共通のinterfaceなど

<br />

## 環境

### Requirement

- typescript
- nodenv
- lerna
- Firebase Cli
- Java (Local emulator)

<br />

[firebase cli]('https://firebase.google.com/docs/cli?hl=ja#mac-linux-npm')

```bash
# firebase CLI installl
$ npm install -g firebase-tools
```

### Mbass

- Firebase

### Front

- Nuxt + composition API

- 基本方針として、VUEXはどうしても必要な場合を除き、極力使用を避ける。
- UIで必要と感じる場合はvue-potalを検討する
- 親子コンポーネントでの利用したい場合は、inject/provideを検討する
- テンプレート再利用は必要なタイミングを見極める

## Lerna

```bash
# すべてのscripts表示
$ yarn show
# Lerna set up node_modules すべてのパッケージにnode_modulesを追加する
$ yarn monorepo:reload

### yarn addの代わりに書きを使用する

# package追加
# Alias
$ yarn lerna:front add package_name

$ yarn lerna:admin add package_name

$ yarn lerna:core add package_name

$ yarn lerna:functions add package_name

```

<br />

## Dev開発

```bash
# dev 環境で起動
$ yarn front:dev
```

## Local開発

```bash
# ローカル用に環境変数を読み込む
$ cd ./packages/cloud
# 環境変数をruntimeconfig.jsonを書き出す
$ firebase functions:config:get > .runtimeconfig.json  
# firebase emulatorで起動
$ yarn local 
```

- Emulator Suite `http://localhost:4000` で起動
- Front `http://localhost:3000`で起動

## Cloud functions deploy with monorepo

<https://jackywxd.medium.com/firebase-setup-for-monorepo-functions-yarn-webpack-45a61e6c14eb>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
