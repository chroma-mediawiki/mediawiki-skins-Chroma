# Chroma

受 Material Design 3 与 M3 Expressive 启发的 MediaWiki 皮肤。

[![CI](https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/actions/workflows/ci.yml/badge.svg)](https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/actions/workflows/ci.yml)
[![License: GPL-3.0-or-later](https://img.shields.io/badge/license-GPL--3.0--or--later-blue.svg)](LICENSE)
[![MediaWiki](https://img.shields.io/badge/MediaWiki-1.43%20%7C%201.45%20%7C%201.46-36c.svg)](docs/COMPAT-MATRIX.md)
[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-006a6a.svg)](https://chroma-mediawiki.github.io/mediawiki-skins-Chroma/demo/)

> 状态：v0.1 开发中。已在 MediaWiki 1.43.0 / 1.45.0 / 1.46.0 真机通过基础冒烟（CI 与 Pages 均通过）。

![Chroma 横幅](screenshots/readme-banner.svg)

## 截图

| 浅色 | 深色 |
|---|---|
| ![浅色](screenshots/app-light.png) | ![深色](screenshots/app-dark.png) |

| 阅读模式 | 移动端 |
|---|---|
| ![阅读模式](screenshots/reading-mode.png) | ![移动端](screenshots/app-mobile.png) |

| MediaWiki 1.43 LTS | MediaWiki 1.45 |
|---|---|
| ![1.43](screenshots/mw143-home.png) | ![1.45](screenshots/mw145-home.png) |

移动端（MobileFrontend + MinervaNeue 共存）：默认手机视图由 MinervaNeue 提供，桌面与 `?useskin=chroma` 使用 Chroma。

| 手机端（MinervaNeue） | 手机端（强制 Chroma） |
|---|---|
| ![MinervaNeue](screenshots/mw146-mobile-minerva.png) | ![Chroma mobile](screenshots/mw146-mobile-chroma.png) |


## MediaWiki 真机截图（1.46.0）

| 浅色 | 深色 |
|---|---|
| ![真机浅色](screenshots/mw146-home.png) | ![真机深色](screenshots/mw146-home-dark.png) |

| 编辑页 | 移动端 |
|---|---|
| ![编辑页](screenshots/mw146-edit.png) | ![移动端](screenshots/mw146-mobile.png) |

> 以上为本地安装 MediaWiki 1.46.0 + SQLite、启用 Chroma 后的实际渲染截图（非静态原型）。

## 特性

- 完整的 Material Design 3 token：色彩角色、字阶、形状、海拔、动效与状态层。
- M3 Expressive 视觉子集：强调字阶、更大圆角与形状、弹簧动效、Expressive 组件。
- 动态色彩：管理员设置默认 seed，用户在偏好设置中选择主题色与明暗模式。
- 两种布局：应用式（顶栏 + 导航抽屉）与阅读式（接近 Vector 2022），可随时切换。
- 阅读模式：隐藏侧栏与操作栏，正文限宽居中，专注长文阅读。
- 无外部请求：字体、图标与脚本全部随皮肤分发，不依赖 CDN。
- 可访问性：WCAG 2.2 AA、键盘可操作、支持 `prefers-reduced-motion`。


## 版本与下载

| MediaWiki | 分支 | 发布 |
|---|---|---|
| 1.43 LTS | `REL1_43` | [v0.1.0-REL1_43](https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/releases/tag/v0.2.0-REL1_43) |
| 1.45 | `REL1_45` | [v0.1.0-REL1_45](https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/releases/tag/v0.2.0-REL1_45) |
| 1.46 | `REL1_46` | [v0.1.0-REL1_46](https://github.com/chroma-mediawiki/mediawiki-skins-Chroma/releases/tag/v0.2.0-REL1_46) |

每个 Release 提供可直接解压到 `skins/Chroma` 的 ZIP。`main` 分支用于开发，不保证与 Release 同步。

## 安装

1. 下载与你 MediaWiki 版本对应的 Release ZIP，解压到 `skins/Chroma`。
2. 在 `LocalSettings.php` 末尾加入：

```php
wfLoadSkin( 'Chroma' );
$wgDefaultSkin = 'chroma';
```

## 配置

```php
$wgChromaDefaultSeed = '#006A6A';   // 主题色种子
$wgChromaDefaultScheme = 'system';  // system | light | dark
$wgChromaDefaultLayout = 'app';     // app | reading
$wgChromaDefaultReadingMode = false;
$wgChromaAllowUserColor = true;
```

完整配置与用户偏好说明见 [docs/THEMING.md](docs/THEMING.md)。

## 兼容性

- MediaWiki 1.43 LTS / 1.45 / 1.46，分别维护于 `REL1_43`、`REL1_45`、`REL1_46` 分支。
- Tier 1 扩展（MediaWiki 自带 33 个 + 社区轻量热门扩展）见 [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md)。
- MobileFrontend：v0.1 与其共存（移动端仍由 MinervaNeue 提供），v0.2 计划接管。

## 开发

```bash
npm install
npm run tokens   # 根据 seed 色重新生成 resources/styles/tokens.css
npm run serve    # 在 http://localhost:8080/demo/ 预览静态原型
```

- 静态原型：`demo/`（GitHub Pages 部署）。
- 本地 MediaWiki 测试环境脚本：`dev/`（进行中）。
- 设计规范：[docs/SPEC.md](docs/SPEC.md)；版本差异：[docs/COMPAT-MATRIX.md](docs/COMPAT-MATRIX.md)。

## 许可

GPL-3.0-or-later。第三方组件许可见 [NOTICE](NOTICE)。

Chroma 是独立的社区项目，与 Google 无关联，也未获其背书。Material Design 与 Material 3 是 Google LLC 的商标。
