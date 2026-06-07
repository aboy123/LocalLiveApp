# 📱 HTML5 App 打包成原生App完整指南

## 🎯 概述

本指南将教你如何将React Web应用打包成Android和iOS原生App。我们使用 **Capacitor** 方案,这是目前最现代、最简单的打包方式。

---

## 📋 前置要求

### Android开发环境
1. **安装 Android Studio**
   - 下载地址: https://developer.android.com/studio
   - 安装时选择 Android SDK 和 Android Virtual Device

2. **配置环境变量**
   ```bash
   # Windows PowerShell
   $env:ANDROID_HOME = "C:\Users\你的用户名\AppData\Local\Android\Sdk"
   ```

3. **安装 JDK 11或更高版本**
   - 推荐: OpenJDK 11

### iOS开发环境 (仅macOS)
1. **安装 Xcode**
   - 从 Mac App Store 下载
   - 需要 macOS 系统

2. **安装 CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

---

## 🚀 打包步骤

### 步骤1: 安装Capacitor依赖 ✅

```bash
cd e:\cad\pc\myapp\html5-app
npm install @capacitor/core @capacitor/cli
```

### 步骤2: 初始化Capacitor ✅

```bash
npx cap init "HTML5 App" com.html5app.myapp --web-dir=dist
```

这会创建 `capacitor.config.json` 配置文件。

### 步骤3: 构建生产版本

```bash
npm run build
```

这会在 `dist/` 目录生成优化的生产文件。

### 步骤4: 添加Android平台

```bash
npm install @capacitor/android
npx cap add android
```

### 步骤5: 添加iOS平台 (macOS only)

```bash
npm install @capacitor/ios
npx cap add ios
```

### 步骤6: 同步Web代码到原生项目

每次修改Web代码后都需要执行:

```bash
npm run build
npx cap sync
```

---

## 📦 打包Android App

### 方法1: 使用Android Studio (推荐)

1. **打开Android项目**
   ```bash
   npx cap open android
   ```
   这会自动在Android Studio中打开项目

2. **等待Gradle同步完成**

3. **连接设备或启动模拟器**
   - USB连接真机
   - 或在Android Studio中创建AVD模拟器

4. **运行App**
   - 点击绿色运行按钮 ▶️
   - 或使用快捷键 Shift+F10

5. **生成APK安装包**
   - 菜单: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK位置: `android/app/build/outputs/apk/debug/app-debug.apk`

6. **生成签名Release版本**
   - 菜单: Build → Generate Signed Bundle / APK
   - 创建或选择密钥库
   - 选择APK格式
   - 生成的APK可用于发布到应用商店

### 方法2: 命令行打包

```bash
cd android
.\gradlew assembleDebug
```

APK位置: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🍎 打包iOS App (macOS only)

### 方法1: 使用Xcode

1. **打开iOS项目**
   ```bash
   npx cap open ios
   ```

2. **配置Signing & Capabilities**
   - 选择你的Apple Developer账号
   - 配置Bundle Identifier
   - 选择Team

3. **选择设备或模拟器**
   - 顶部工具栏选择目标设备

4. **运行App**
   - 点击运行按钮 ▶️
   - 或按 Cmd+R

5. **归档发布**
   - 菜单: Product → Archive
   - 验证后上传到App Store

### 方法2: 命令行打包

```bash
cd ios
pod install
xcodebuild -workspace App.xcworkspace -scheme App -configuration Release
```

---

## 🔧 常用Capacitor命令

```bash
# 查看已添加的平台
npx cap ls

# 同步Web代码到原生
npx cap sync

# 复制Web代码(不同步插件)
npx cap copy

# 更新原生项目
npx cap update

# 打开Android Studio
npx cap open android

# 打开Xcode
npx cap open ios

# 在浏览器中实时预览
npx cap serve
```

---

## 📝 配置说明

### capacitor.config.json

```json
{
  "appId": "com.html5app.myapp",
  "appName": "HTML5 App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https",
    "iosScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#667eea"
    }
  }
}
```

### 重要配置项

- **appId**: 应用的唯一标识符
- **appName**: 应用显示名称
- **webDir**: Web构建输出目录
- **server**: 服务器配置
- **plugins**: 插件配置

---

## 🔌 常用Capacitor插件

### 安装插件

```bash
# 相机
npm install @capacitor/camera
npx cap sync

# 文件系统
npm install @capacitor/filesystem
npx cap sync

# 通知
npm install @capacitor/local-notifications
npx cap sync

# 地理位置
npm install @capacitor/geolocation
npx cap sync

# 网络状态
npm install @capacitor/network
npx cap sync
```

### 在代码中使用

```javascript
import { Camera } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: 'uri'
  });
  
  console.log(image.webPath);
};
```

更多插件: https://capacitorjs.com/docs/plugins

---

## 🎨 优化建议

### 1. 添加启动画面

```bash
npm install @capacitor/splash-screen
npx cap sync
```

在 `src/main.jsx` 中添加:

```javascript
import { SplashScreen } from '@capacitor/splash-screen';

// App加载完成后隐藏启动画面
SplashScreen.hide();
```

### 2. 处理返回按钮 (Android)

在 `src/App.jsx` 中添加:

```javascript
import { App as CapacitorApp } from '@capacitor/app';

// 监听返回按钮
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});
```

### 3. 适配安全区域

在CSS中添加:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

---

## 🐛 常见问题

### Q1: Gradle同步失败
**解决**: 
- 检查网络连接
- 清理缓存: `cd android && .\gradlew clean`
- 重新同步

### Q2: iOS编译错误
**解决**:
- 更新CocoaPods: `pod repo update`
- 清理DerivedData
- 重新安装pods: `cd ios && pod install`

### Q3: 白屏问题
**解决**:
- 检查控制台错误
- 确认 `dist/` 目录有正确文件
- 运行 `npx cap sync`

### Q4: 插件不工作
**解决**:
- 确认已运行 `npx cap sync`
- 检查插件是否正确安装
- 查看原生项目配置

---

## 📊 应用商店发布

### Google Play Store (Android)

1. **注册开发者账号** ($25一次性)
2. **创建应用**
3. **填写应用信息**
   - 标题、描述、截图
   - 隐私政策
   - 内容分级
4. **上传APK/AAB**
5. **提交审核** (通常1-3天)

### Apple App Store (iOS)

1. **注册Apple Developer** ($99/年)
2. **创建App ID和证书**
3. **在App Store Connect创建应用**
4. **填写应用信息**
5. **上传IPA文件**
6. **提交审核** (通常1-2周)

---

## 🔄 持续集成/部署

### GitHub Actions示例

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build web app
      run: npm run build
    
    - name: Setup Java
      uses: actions/setup-java@v2
      with:
        java-version: '11'
    
    - name: Build Android APK
      run: |
        npm install @capacitor/android
        npx cap add android
        npx cap sync
        cd android
        ./gradlew assembleDebug
    
    - name: Upload APK
      uses: actions/upload-artifact@v2
      with:
        name: app-debug.apk
        path: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📚 学习资源

- **Capacitor官方文档**: https://capacitorjs.com/docs
- **Ionic框架**: https://ionicframework.com
- **Android开发文档**: https://developer.android.com
- **iOS开发文档**: https://developer.apple.com

---

## ✅ 快速开始清单

- [ ] 安装Android Studio
- [ ] 配置Android SDK
- [ ] 安装Capacitor依赖
- [ ] 初始化Capacitor配置
- [ ] 构建生产版本 (`npm run build`)
- [ ] 添加Android平台
- [ ] 同步代码 (`npx cap sync`)
- [ ] 在Android Studio中打开并运行
- [ ] 测试所有功能
- [ ] 生成签名APK
- [ ] 发布到应用商店

---

## 💡 提示

1. **开发阶段**: 使用调试版本,方便调试
2. **发布前**: 务必测试所有功能
3. **性能优化**: 压缩图片,懒加载组件
4. **用户体验**: 添加加载动画,优化首屏时间
5. **安全性**: 不要在前端存储敏感信息

---

**祝你打包成功! 🎉**

如有问题,请查阅:
- Capacitor Issues: https://github.com/ionic-team/capacitor/issues
- Stack Overflow: https://stackoverflow.com/questions/tagged/capacitor
