# 📱 快速打包APK指南

## ✅ 已完成的步骤

1. ✅ 构建生产版本 (`npm run build`)
2. ✅ 添加Android平台 (`npx cap add android`)
3. ✅ 同步代码 (`npx cap sync`)
4. ✅ 打开Android Studio (`npx cap open android`)

---

## 🎯 在Android Studio中生成APK

### 方法1：生成调试版APK（快速测试）

1. **等待Gradle同步完成**
   - Android Studio打开后会自动同步
   - 查看底部状态栏，等待"BUILD SUCCESSFUL"

2. **连接设备或启动模拟器**
   - USB连接安卓手机（需开启开发者模式和USB调试）
   - 或在Android Studio中创建AVD模拟器

3. **运行App测试**
   - 点击绿色运行按钮 ▶️
   - 或按 `Shift + F10`

4. **生成APK文件**
   - 菜单：**Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - 等待构建完成
   - APK位置：`android/app/build/outputs/apk/debug/app-debug.apk`

5. **安装到手机**
   - 将APK文件复制到手机
   - 在手机上安装即可使用

---

### 方法2：生成签名版APK（发布用）

1. **创建密钥库**
   - 菜单：**Build → Generate Signed Bundle / APK**
   - 选择 **APK**
   - 点击 **Create new...**
   - 填写信息：
     - Key store path: 选择保存位置（如 `myapp-release.keystore`）
     - Password: 设置密码（记住这个密码！）
     - Alias: 输入别名（如 `myapp`）
     - Validity: 25年
     - 填写证书信息（可以随便填）
   - 点击 **OK**

2. **生成签名APK**
   - 选择刚才创建的密钥库
   - 输入密码
   - 选择 **release** 构建类型
   - 勾选两个签名版本（V1和V2）
   - 点击 **Finish**

3. **获取APK**
   - APK位置：`android/app/release/app-release.apk`
   - 这个APK可以发布到应用商店

---

## 🔧 命令行快速打包（无需Android Studio）

如果你已经配置好Android SDK环境变量，可以直接用命令：

```powershell
# 进入android目录
cd android

# 生成调试版APK
.\gradlew assembleDebug

# APK位置：android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📍 APK文件位置

| 类型 | 路径 |
|------|------|
| 调试版 | `android\app\build\outputs\apk\debug\app-debug.apk` |
| 发布版 | `android\app\build\outputs\apk\release\app-release.apk` |

---

## 🔄 更新App内容

每次修改Web代码后：

```powershell
# 1. 重新构建
npm run build

# 2. 同步到原生项目
npx cap sync

# 3. 在Android Studio中重新构建APK
# 或命令行：cd android; .\gradlew assembleDebug
```

---

## ⚠️ 常见问题

### Q1: Gradle同步很慢或失败
**解决**：
- 检查网络连接
- 配置国内镜像（修改 `android/build.gradle`）
- 清理缓存：`cd android; .\gradlew clean`

### Q2: 找不到Android SDK
**解决**：
- 确保安装了Android Studio
- 配置环境变量 `ANDROID_HOME`

### Q3: APK安装后白屏
**解决**：
- 确认已执行 `npm run build`
- 确认已执行 `npx cap sync`
- 查看Logcat错误日志

---

## 💡 提示

1. **调试阶段**：使用调试版APK，方便测试
2. **发布前**：务必在真机上测试所有功能
3. **性能优化**：压缩图片、懒加载组件
4. **首次打开慢**：是正常的，后续会快很多

---

## 📚 更多信息

详细文档请查看：[BUILD_APP_GUIDE.md](./BUILD_APP_GUIDE.md)

祝你打包成功！🎉
