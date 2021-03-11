# Nuxt firebase Monorepo

## GitFlow

mainブランチは直接マージしない
pull request  を送るようにする。

## 構成

---

- Packages
  - front: フロントアプリケーション
  - admin: 管理側
  - function: cloud functions
  - core: 共通のinterfaceなど

<br />

## 環境

---

### Requirement

---

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

---

- Firebase

### Front

---

- Nuxt + composition API

- 基本方針として、VUEXはどうしても必要な場合を除き、極力使用を避ける。
- UIで必要と感じる場合はvue-potalを検討する
- 親子コンポーネントでの利用したい場合は、inject/provideを検討する
- テンプレート再利用は必要なタイミングを見極める

## Lerna

---

```bash
# Lerna set up node_modules すべてのパッケージにnode_modulesを追加する
$ yarn bootstrap

# すべてのパッケージからnode_modulesを削除
$ yarn clean

# すべてのモジュールからyarn.lockを削除
$ yarn clean-locks

### 依存関係により以下を意識してほしい

# package追加
$ npx lerna add package_name 追加するパッケージ --scope @works/functions 依存先

# Alias
$ yarn lerna:front add package_name

$ yarn lerna:admin add package_name

$ yarn lerna:core add package_name

$ yarn lerna:functions add package_name

```

<br />

### Hoistについて

---

なにも意識しない場合は、hoist( node_modulesの巻き上げ )されるため、rootのnode_modulesに追加される
各パッケージで管理が必要な場合は、パッケージ下のpackeage.jsonにnohoistを追加

<br />

```json
{
  "workspaces": {
    "nohoist": [
      "@works/core",
    ]
  }
}
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

## Backlog連携

[参考](https://github.com/bicstone/backlog-notify)

コミットメッセージを下記のように追加するとbacklogと連携します。
※複数タスクには対応していない。

```
HASEKO_MK-〇〇　修正　#fix
```

- #fix #fixes #fixed のどれかで処理済み
- #close #closes #closed のどれかで完了

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
