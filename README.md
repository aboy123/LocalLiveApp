# HTML5 App - 绾噣鐗?

## 馃搵 椤圭洰璇存槑

杩欐槸涓€涓?React + Vite 鍓嶇 + Node.js 鍚庣 + MongoDB 鏁版嵁搴撶殑鍏ㄦ爤搴旂敤銆?

## 馃殌 蹇€熷紑濮?

### 1. 瀹夎渚濊禆

#### 鍓嶇
`ash
npm install
`

#### 鍚庣
`ash
cd server
npm install
`

### 2. 閰嶇疆鐜鍙橀噺

#### 鍓嶇 (.env)
`env
VITE_API_URL=http://localhost:5000/api
`

#### 鍚庣 (server/.env)
`env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/html5app
JWT_SECRET=your-secret-key-change-in-production
`

### 3. 鍚姩鏈嶅姟

#### 鍚姩鍚庣
`ash
cd server
npm start
`

#### 鍚姩鍓嶇锛堟柊缁堢锛?
`ash
npm run dev
`

### 4. 璁块棶搴旂敤

- 鍓嶇: http://localhost:5173
- API: http://localhost:5000/api/health

## 馃寪 閮ㄧ讲鍒?Vercel

1. 鎺ㄩ€佷唬鐮佸埌 GitHub
2. 鍦?Vercel 瀵煎叆椤圭洰
3. 閰嶇疆鐜鍙橀噺锛?
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - VITE_API_URL=https://your-app.vercel.app/api
4. 鐐瑰嚮 Deploy

璇︾粏閮ㄧ讲鎸囧崡瑙侊細DEPLOYMENT_GUIDE.md

## 馃搳 鎶€鏈爤

**鍓嶇:**
- React 18
- Vite
- React Router
- Capacitor (绉诲姩绔?

**鍚庣:**
- Node.js + Express
- MongoDB + Mongoose
- JWT 璁よ瘉
- bcryptjs 瀵嗙爜鍔犲瘑

**閮ㄧ讲:**
- Vercel (Serverless)
- MongoDB Atlas (浜戠鏁版嵁搴?

## 馃搧 椤圭洰缁撴瀯

`
鈹溾攢鈹€ src/              # 鍓嶇婧愮爜
鈹溾攢鈹€ server/           # 鍚庣婧愮爜
鈹?  鈹溾攢鈹€ config/       # 閰嶇疆
鈹?  鈹溾攢鈹€ middleware/   # 涓棿浠?
鈹?  鈹溾攢鈹€ models/       # 鏁版嵁妯″瀷
鈹?  鈹斺攢鈹€ routes/       # API璺敱
鈹溾攢鈹€ api/              # Serverless API鍏ュ彛
鈹溾攢鈹€ public/           # 闈欐€佽祫婧?
鈹溾攢鈹€ vercel.json       # Vercel閰嶇疆
鈹斺攢鈹€ package.json      # 渚濊禆閰嶇疆
`

## 馃敡 甯哥敤鍛戒护

`ash
# 鍓嶇
npm run dev       # 寮€鍙戞ā寮?
npm run build     # 鏋勫缓鐢熶骇鐗堟湰
npm run preview   # 棰勮鐢熶骇鏋勫缓

# 鍚庣
cd server
npm start         # 鍚姩鏈嶅姟鍣?
npm run seed      # 鍒濆鍖栫ず渚嬫暟鎹?
npm run test-connection  # 娴嬭瘯鏁版嵁搴撹繛鎺?
`

## 馃摓 鏀寔

閬囧埌闂锛熸煡鐪嬪畬鏁存枃妗ｆ垨鎻?Issue銆?

---

**绁濅娇鐢ㄦ剦蹇紒** 馃帀
