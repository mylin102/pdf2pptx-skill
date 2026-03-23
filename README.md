# AI Strategy & Professional PPTX Automation

本專案旨在提供一個自動化、高品質的解決方案，將複雜的科技策略報告（PDF 或 Markdown 格式）轉換為具備法人級視覺水準的專業 PowerPoint (PPTX) 簡報。

專案內含一份核心技能：**`pdf2pptx-skill`**，它整合了 **MinerU** 的高保真 PDF 提取能力與 **html2pptx** 的精準佈局引擎。

---

## 🚀 快速開始

### 1. 環境準備

本專案依賴 Python 與 Node.js 環境，請依序安裝以下套件：

#### Python (用於 PDF 提取)
```bash
pip install mineru[all]
```
*註：初次執行時會自動檢查並下載約 2-4GB 的 AI 模型檔案。*

#### Node.js (用於 PPTX 產生)
```bash
npm install pptxgenjs playwright sharp
# 安裝 Playwright 內建瀏覽器 (建議 macOS/Linux 必做)
npx playwright install chromium
```

### 2. 安裝 pdf2pptx-skill 技能

若要在 Claude Code 中啟用此技能，請選擇以下其中一種方式：

#### 方案 A：在專案目錄中使用 (推薦)
本專案已包含 `.claude/skills/pdf2pptx-skill` 目錄。當您在專案根目錄啟動 Claude Code 時，系統會自動偵測並載入該技能。

#### 方案 B：全域安裝 (在任何目錄都能呼叫)
建立全域連結，讓您在其他專案也能使用：
```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)/.claude/skills/pdf2pptx-skill" ~/.claude/skills/pdf2pptx-skill
```

---

## 🛠️ 標準工作流程

當您有一個 `input.pdf` 需要轉換時，請依照技能導引執行：

1.  **PDF 提取 (MinerU)：**
    將 PDF 轉換為結構化的 Markdown 與高解析度圖片。
    ```bash
    mineru -p input.pdf -o ./output_dir -b pipeline
    ```

2.  **內容規劃：**
    分析產出的 `auto.md`，將標題、重點與 `images/` 中的圖表分配至 HTML 投影片。

3.  **PPTX 產生：**
    執行產生腳本。若在特定環境執行，請確保 `NODE_PATH` 已設定：
    ```bash
    export NODE_PATH=$(pwd)/node_modules
    node generate_pptx.js
    ```

---

## 💡 核心技術規範 (pdf2pptx-skill)

為了確保轉換成功，請遵循技能定義中的規範：
- **文字包裹：** 所有文字必須包裹在 `<p>`, `<h1>`-`<h6>` 或列表標籤中。
- **樣式限制：** 邊框 (border) 與背景僅能套用於 `<div>`，不可直接套用於文字標籤。
- **佈局維度：** 採用 16:9 標準 (`720pt x 405pt`)，底邊需保留 `0.5"` 的安全邊距。
- **環境相容性：** 在 macOS 上，本技能預設使用內建的 `html2pptx_local.js` 以解決 Chrome 路徑相依性問題。

---

## 📁 專案結構
- `.claude/skills/pdf2pptx-skill/`: 技能定義與工作流規範。
- `html2pptx_local.js`: 經過修正的本地轉換核心庫。
- `generate_pptx.js`: 簡報產生範例腳本。
- `AI_Strategy_Report.pptx`: 已成功轉換的範例簡報。

---

## 🤝 貢獻與反饋
若在使用 `pdf2pptx-skill` 技能時遇到佈局驗證錯誤，請參考 `SKILL.md` 中的 **Troubleshooting** 章節進行修正。
