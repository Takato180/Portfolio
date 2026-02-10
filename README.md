# Takato Studio - Portfolio

Three.js / WebGL を活用したインタラクティブ 3D Web 体験を制作するクリエイティブ Web デベロッパーのポートフォリオサイト。


## Overview

| 項目 | 内容 |
|------|------|
| サイト名 | Takato Studio |
| 種別 | ポートフォリオ / リソース紹介 |
| URL | https://takato180.github.io/Portfolio/ |
| テーマ | ダークテーマ（パープルアクセント） |
| 対応 | レスポンシブ（PC / タブレット / スマホ） |


## Sections

| # | セクション | 内容 |
|---|-----------|------|
| -- | Hero | Three.js パーティクルアニメーション背景、キャッチコピー |
| 01 | About | 自己紹介、スタッツカウンター、ワイヤーフレーム正二十面体 |
| 02 | Works | 制作物一覧（=LOVE 3D Stage をフィーチャー） |
| 03 | Skills | 技術スタック（3D/WebGL、Frontend、Tools） |
| 04 | Resources | 学習リソース紹介（書籍・コース・ツール） |


## Tech Stack

| カテゴリ | 技術 |
|----------|------|
| 3D / WebGL | Three.js v0.160.0, ES Modules (importmap) |
| フロント | HTML5, CSS3 (Custom Properties), Vanilla JS |
| フォント | Inter, Noto Sans JP, JetBrains Mono (Google Fonts) |
| アニメーション | CSS Keyframes, IntersectionObserver, requestAnimationFrame |
| ホスティング | GitHub Pages |


## Features

| 機能 | 説明 |
|------|------|
| パーティクル背景 | 2000個のパーティクル + 近接パーティクル間の接続線 + 中心グロー |
| ワイヤーフレームオブジェクト | About セクションの正二十面体（外殻 + 内殻の逆回転） |
| カスタムカーソル | ドット + リング追従、ホバー時の拡大エフェクト |
| スクロールリビール | IntersectionObserver によるフェードイン表示 |
| スタッツカウンター | イージング付きのカウントアップアニメーション |
| マウス追従カメラ | Hero 3D シーンのカメラがマウス位置に追従 |
| レスポンシブ | 900px / 600px ブレークポイント、モバイルメニュー対応 |


## Project Structure

```
portfolio/
  index.html    -- メインHTML（セクション構成、SEO/OGP メタ）
  style.css     -- 全スタイル（CSS変数、レスポンシブ、アニメーション）
  main.js       -- Three.js シーン、カーソル、スクロール、カウンター
  README.md     -- このファイル
```


## Getting Started

1. リポジトリをクローン

```
git clone https://github.com/Takato180/portfolio.git
cd portfolio
```

2. ローカルサーバーで起動

```
python -m http.server 8080
```

3. ブラウザで `http://localhost:8080/` を開く


## Works

| プロジェクト | 技術 | 説明 |
|-------------|------|------|
| =LOVE 3D Stage | Three.js, WebGL, GLSL, YouTube API | GLBステージモデル上で60曲以上の3Dエフェクトが連動する没入型ファンサイト |
| Project 02 | Three.js, React | 準備中 |
| Project 03 | WebGL, GLSL | 準備中 |


## Customization

| 項目 | ファイル | 変数 / 箇所 |
|------|---------|-------------|
| メインカラー | style.css | `--accent` / `--accent-2` |
| 背景色 | style.css | `--bg` / `--bg-2` |
| フォント | style.css | `--font` / `--font-mono` |
| パーティクル数 | main.js | `particleCount` |
| パーティクルカラー | main.js | `palette` 配列 |
| 接続線距離 | main.js | `connectDist` |


## Revenue Points (Planned)

| 種別 | 状態 | 備考 |
|------|------|------|
| Amazon アソシエイト | 未設定 | Resources セクションの書籍リンクに設置予定 |
| Udemy アフィリエイト | 未設定 | Resources セクションのコースリンクに設置予定 |
| Google AdSense | 未設定 | 審査通過後にスクリプト差し替え |


## Notes

- `cursor: none` によるカスタムカーソルはモバイル（600px以下）では無効化
- Three.js は CDN (jsDelivr) から importmap 経由で読み込み
- AdSense スクリプトはコメントアウト状態（審査通過後に有効化）


## License

MIT


Last updated: 2026-02-11
