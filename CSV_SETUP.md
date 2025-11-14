# CSV 資料儲存設定說明

## 概述

此專案已配置為將表單資料儲存到 CSV 檔案中，並從 CSV 檔案讀取統計資料。

## 資料流程

### 1. 表單提交 → CSV 儲存
- 使用者填寫素食承諾表單
- 資料透過 `/api/save_to_csv.php` 儲存
- 資料同時寫入兩個位置：
  - `api/survey_data.csv` (後端備份)
  - `public/api/survey_data.csv` (前端可讀取)

### 2. 統計頁面 → CSV 讀取
- 統計頁面從 `public/api/survey_data.csv` 讀取資料
- 使用 PapaParse 解析 CSV
- 計算國家統計和素食時長統計

## CSV 檔案格式

```csv
name,gender,country,isVegetarian,vegetarianTime
張三,male,Taiwan,yes,life-after-life
李四,female,United States,no,1-year
```

### 欄位說明
- **name**: 姓名
- **gender**: 性別 (male/female)
- **country**: 國家
- **isVegetarian**: 目前是否素食 (yes/no)
- **vegetarianTime**: 承諾時長
  - `1-day`: 一天
  - `1-day-per-week`: 一週一天
  - `7-days`: 七天
  - `1-month`: 一個月
  - `1-year`: 一年
  - `whole-life`: 一生一世
  - `life-after-life`: 生生世世

## 需要 PHP 伺服器

### 為什麼需要 PHP？
表單提交需要 PHP 來處理檔案寫入操作（瀏覽器無法直接寫入本地檔案）。

### 啟動 PHP 伺服器

**選項 1: 使用內建 PHP 伺服器**
```bash
# 在專案根目錄執行
php -S localhost:8000
```

**選項 2: 使用 XAMPP/WAMP/MAMP**
- 安裝 XAMPP、WAMP 或 MAMP
- 將專案放在 `htdocs` 資料夾
- 啟動 Apache 伺服器

### Vite 代理設定
`vite.config.js` 已配置代理，將 `/api` 請求轉發到 PHP 伺服器：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

## 完整啟動步驟

### 開發環境
```bash
# 1. 安裝依賴
npm install

# 2. 啟動 PHP 伺服器（在一個終端）
php -S localhost:8000

# 3. 啟動 Vite 開發伺服器（在另一個終端）
npm run dev
```

### 測試表單提交
1. 開啟瀏覽器訪問 `http://localhost:5173`
2. 導航到表單頁面
3. 填寫並提交表單
4. 檢查 `public/api/survey_data.csv` 是否有新資料

### 測試統計頁面
1. 確保 `public/api/survey_data.csv` 有資料
2. 訪問統計頁面
3. 應該能看到國家統計和素食時長統計

## 疑難排解

### 表單提交失敗
- 確認 PHP 伺服器正在運行（port 8000）
- 檢查瀏覽器控制台的錯誤訊息
- 確認 `api` 和 `public/api` 資料夾存在且有寫入權限

### 統計頁面沒有資料
- 確認 `public/api/survey_data.csv` 檔案存在
- 檢查 CSV 檔案格式是否正確
- 查看瀏覽器控制台的錯誤訊息

### PHP 未安裝
**Windows:**
- 下載 PHP: https://windows.php.net/download/
- 或安裝 XAMPP: https://www.apachefriends.org/

**Mac:**
```bash
brew install php
```

**Linux:**
```bash
sudo apt-get install php
```

## 備註

- CSV 檔案會自動創建（如果不存在）
- 每次表單提交都會將新資料附加到 CSV 檔案末尾
- 統計資料即時從 CSV 計算，無需資料庫
- 建議定期備份 `api/survey_data.csv` 檔案
