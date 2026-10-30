# Oka 的隨堂筆記

依照提供的列表與文章雛型製作的 Angular 純前端 Blog Demo。沒有後端、資料庫或登入功能。

## 啟動

需要 Node.js **22.22.3 以上的 22.x**，或 **24.15.0 以上的 24.x**（Angular 22 的執行需求）。

```sh
npm install
npm start
```

瀏覽器開啟 http://127.0.0.1:4200/。

```sh
npm run build
```

建置結果在 `dist/blog-sample/browser/`，可放到一般靜態網站服務。使用 hash 路由，文章網址如 `/#/posts/css-label`，重新整理不需要伺服器路由設定。

請透過 HTTP 服務開啟，不能直接雙擊 HTML，因為瀏覽器需要讀取 JSON。

## 常用修改位置

| 檔案                       | 用途                                 |
| -------------------------- | ------------------------------------ |
| `demo-data/blog.json`      | 網站名稱、作者、簡介、封面與頭像路徑 |
| `demo-data/posts.json`     | 文章內容、標籤及預載留言             |
| `src/styles.css`           | 全站樣式；開頭集中設定色彩與版面寬度 |
| `src/app/app.html`         | 頁首、封面及共用版面                 |
| `src/app/sidebar.html`     | 作者與篩選側欄                       |
| `src/app/post-list.html`   | 列表頁面                             |
| `src/app/post-detail.html` | 文章內頁                             |
| `src/app/comments.html`    | 留言區                               |
| `public/images/`           | 本機圖片                             |

Angular 會把 `demo-data/*.json` 複製到網站的 `data/`，瀏覽器透過 HttpClient 載入。新增文章後，分類、年份、文章數會自動更新；JSON 修改後重新整理頁面即可讀取。

## 文章格式

複製現有文章並修改即可。`id` 與 `slug` 應保持唯一，日期使用 `YYYY-MM-DD`。內文 `content` 支援：

```json
[
  { "type": "paragraph", "text": "段落內容" },
  { "type": "heading", "level": 2, "text": "小標題" },
  { "type": "list", "items": ["第一點", "第二點"] },
  { "type": "code", "language": "CSS", "text": ".note { color: #333; }" },
  {
    "type": "image",
    "src": "images/example.jpg",
    "alt": "圖片的文字描述",
    "caption": "圖片說明（可省略）"
  }
]
```

文字與程式碼透過 Angular 文字綁定顯示，不直接執行文章內的 HTML。圖片請放在 `public/images/`。

## 功能與資料

- 六篇文章、標題／摘要／標籤搜尋、分類與年份篩選、空結果提示。
- 網址保留篩選條件，從文章返回列表可以繼續原本的篩選。
- 文章內頁、來源連結、示意圖、程式碼與留言。
- 新增留言保存在 `localStorage` 的 `oka-blog.comments.v1`，只存在目前瀏覽器；網站不會修改原 Blog。若儲存空間不可用，會提示留言僅暫時保留。
- 手機單欄版型；「探索筆記」可收合分類和年份。
- JSON 載入失敗可重試，無效文章網址顯示找不到文章。

文章來源為 [Oka 的隨堂筆記](https://okaoka0709.blogspot.com/)。保留原標題、作者、日期及連結；內文為重點摘要，並非原文全文。分類與標籤為 Demo 編排。新增的程式碼為精簡示例，排版示意圖為本專案繪製；預載留言已標示為 Demo。

封面為 [Unsplash 京都示意照片](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e)，頭像為示意插圖，均可在 `blog.json` 替換。示意頭像不代表作者本人。
