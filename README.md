# Jason 品牌成長顧問官網

一頁式 RWD 顧問官網，純靜態 HTML／CSS／JS，部署在 GitHub Pages。

- 需求規格：`rdq/RDQ-spec-jason-consulting-site-20261007.md`
- 架構藍圖與視覺規範：見 claude.ai 上的「Jason 顧問官網藍圖」

## 正式上線前要做的事

- 刪除 `index.html` 裡的 `<meta name="robots" content="noindex, nofollow">`（預覽期間靠這一行擋搜尋引擎）

## 上線前要替換的三個地方

1. **網域**：把所有檔案裡的 `https://jason12236-cmo.github.io/jason-consulting-site` 換成你的網址（例如 `https://jasontsai.tw`，結尾不加斜線）。出現在 `index.html`、`robots.txt`、`sitemap.xml`。
2. **CNAME**：在根目錄新增 `CNAME` 檔案，內容只有一行網域，例如 `jasontsai.tw`。
3. **GA4 與預約表單**：打開 `assets/js/main.js`，填最上方的 `SITE` 設定：

```js
var SITE = {
  ga4Id: "G-XXXXXXXXXX",
  bookingUrl: "https://forms.gle/xxxx"
};
```

留空也能正常運作：沒有 GA4 就不追蹤；沒有表單，主要按鈕會改成「寫信預約諮詢」。

## 怎麼改內容

| 想改的東西 | 檔案 | 搜尋關鍵字 |
|---|---|---|
| 主標、副標 | `index.html` | `S1 HERO` |
| 痛點、為何外聘 | `index.html` | `S2 PAIN` |
| 資歷、工具、產業 | `index.html` | `S3 PROFILE` |
| 成就數字 | `index.html` | `S4 RESULTS`（數字要同時改 `data-to` 和顯示文字） |
| 方案與價格 | `index.html` | `S5 SERVICES`；結構化資料的價格在 `<head>` 的 `ld+json` 裡也要同步 |
| 合作流程 | `index.html` | `S6 PROCESS` |
| 顏色、字級 | `assets/css/style.css` | 最上方 `:root` |
| 分享預覽圖 | `assets/og-image.png` | 1200×630 |

改完存檔、commit、push，GitHub Pages 約 1 分鐘後更新。

## GitHub Pages 與自有網域設定

1. Repo → Settings → Pages → Source 選 `Deploy from a branch`，分支選 `main`、資料夾 `/ (root)`。
2. Custom domain 填你的網域並儲存。
3. 到網域商的 DNS 後台新增記錄：
   - 根網域（`jasontsai.tw`）：4 筆 A 記錄，指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - `www`：1 筆 CNAME，指向 `<你的 GitHub 帳號>.github.io`
4. DNS 生效後（幾分鐘到 24 小時），回到 Pages 設定勾選 **Enforce HTTPS**。

## 視覺規範摘要

全站單一暖灰色系，以深淺分段；每段以「色帶標題」開場，內容用方格／色塊區隔；圖文段與純文字段交錯。

| Token | 值 | 用途 |
|---|---|---|
| Paper | `#F7F5F1` | 淺色段落底 |
| Stone | `#EFEAE2` | 交替段落底 |
| Sand | `#E5DCCD` / `#D9CDBB` | 段落標題色帶、首頁動態區 |
| Card | `#FFFFFF` | 卡片 |
| Deep | `#3D362E` / `#4A4239` | 關鍵成就、資歷數字、頁尾 |
| Ink | `#27231E` | 主文字、主要按鈕 |
| Muted | `#6C655C` | 說明文字 |
| Gold | `#B08A45` | 方格點綴 |
| Bronze | `#7C5F2A` | 淺底上的小標 |
| Gold-light | `#DCC08A` | 深底上的數字 |

字級（由大到小，同層級同樣式）：H1 首頁主標 → H2 段落標題（Chiron Sung HK 粗體）→ H3 卡片標題（黑體粗體 18–21px）→ 說明文字（15–16px，一律小於標題）。英文與數字用 Manrope。

## 照片

| 位置 | 檔案 | 建議尺寸 |
|---|---|---|
| 首頁橫幅 | `assets/img/hero.jpg` | 2400×1200 以上，橫式，主體偏右（左側要放文字） |
| 預約諮詢形象照 | `assets/img/portrait.webp` | 去背，直式 |

換照片只要用同樣檔名覆蓋即可。首頁照片不存在時會自動顯示深色漸層。

首頁照片來源：Unsplash（Vitaly Gariev），依 Unsplash License 免費商用。
