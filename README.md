# Math 102A 課程數位知識庫 (LLM Wiki)

本專案是一個遵循 **LLM Wiki（原子化筆記）規範** 的個人化課程知識整理網頁與數位知識庫，主要針對 **Spring 2026 Math 102A**（微積分與空間解析幾何）課程內容進行結構化整理與模組化呈現。

---

## 專案核心特色

- **Reader-First 視覺風格**：極簡、乾淨、低干擾，段落與公式留白充足，內文寬度限制於最佳閱讀視線（`70ch ~ 80ch`）。
- **標準三欄式架構**：
  1. **左側邊欄 (Sidebar)**：樹狀階層目錄（依「學科領域 > 子主題 > 知識點」展開），支援收合與全域即時搜尋。
  2. **中央主內容區 (Main Content)**：呈現單一知識點的原子化筆記，包含「一句話核心定義」引言框、KaTeX 數學公式、對比表格與常見誤區提醒。
  3. **右側大綱與關聯欄 (TOC & Links)**：文章標題目錄（ScrollSpy 即時捲動高亮追蹤），以及「前置知識 (Prerequisites)」與「延伸概念 (Related)」雙向關聯跳轉。
- **深色 / 淺色主題**：支援深淺色即時切換與持久化記憶。
- **KaTeX 數學渲染**：完美支援微積分定積分、極限、向量、行列式與空間幾何方程式。

---

## 目錄結構

```text
hw9/
├── agent.md                                     # 個人課程知識庫專案規範 (LLM Wiki)
├── CLAUDE.md                                    # 專案指引
├── index.html                                   # 知識庫主頁面模板 (Reader-First 三欄式)
├── css/
│   └── style.css                                # 樣式表 (深淺色切換、三欄版面、KaTeX 美化)
├── js/
│   ├── app.js                                   # 核心前端邏輯 (Markdown/Frontmatter/TOC/路由)
│   └── embedded-data.js                         # 離線/直接點開備用資料字典
└── docs/                                        # 知識庫內容根目錄
    ├── index.md                                 # 總首頁與學習地圖
    ├── _templates/
    │   └── note-template.md                     # 新增知識點標準範本
    ├── calculus-integration/                    # 微積分積分應用
    │   ├── _index.md                            # 單元導覽
    │   ├── areas-under-curves.md                # 6.1 曲線間面積與切片法
    │   ├── disk-washer-method.md                # 6.2 旋轉體體積：圓盤與圓環法
    │   └── cylindrical-shells.md                # 6.3 旋轉體體積：柱殼法
    └── spatial-geometry-vectors/                # 空間幾何與向量
        ├── _index.md                            # 單元導覽
        ├── coordinate-systems-3d.md             # 12.1 三維直角坐標系與基本曲面
        ├── vectors-basics.md                    # 12.2 空間向量與分量表示
        ├── dot-product.md                       # 12.3 向量內積與正交投影
        ├── cross-product.md                     # 12.4 向量外積與行列式應用
        └── lines-and-planes.md                  # 12.5 空間直線與平面方程式
```

---

## 本地預覽

1. **直接開啟**：在檔案總管中雙擊 `index.html` 即可在瀏覽器中瀏覽。
2. **本機伺服器**：
   ```powershell
   python -m http.server 8080
   ```
   瀏覽器開啟 `http://localhost:8080` 即可預覽。
