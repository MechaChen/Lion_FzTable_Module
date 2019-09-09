### 1. CSS 樣式以 Mobile 為主(效能問題)

### 2. magaele

### 3. yarn storybook

> 可以記錄 & 客製化 component
> 參考文章：https://www.learnstorybook.com/react/en/get-started/

### 4. component 用在多個地方

> 樣式部分可以覆寫，若須改 HTML 結構可能重寫一 component

### 5. 如果在 src 放 JSON 檔會發生錯誤

> npx create react-app 原本的設定，若還是要放在 src 則需打開其 Webpack
> 參考文章：https://stackoverflow.com/questions/53519527/how-to-access-json-file-in-src-folder-created-using-create-react-app
> (因原 bundle 設定在 public folder 內)

### 6. Wepack 試著用 Wepack 4
