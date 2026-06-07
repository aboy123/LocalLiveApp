# HTML5 App 快速打包脚本
# 适用于 Windows PowerShell

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  HTML5 App 打包工具" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 检查Node.js
Write-Host "检查 Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 未找到 Node.js,请先安装 Node.js" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js 版本: $nodeVersion" -ForegroundColor Green
Write-Host ""

# 步骤1: 构建生产版本
Write-Host "步骤 1/4: 构建生产版本..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 构建完成" -ForegroundColor Green
Write-Host ""

# 步骤2: 添加Android平台
Write-Host "步骤 2/4: 添加 Android 平台..." -ForegroundColor Yellow
if (-Not (Test-Path "android")) {
    npm install @capacitor/android
    npx cap add android
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 添加 Android 平台失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Android 平台已添加" -ForegroundColor Green
} else {
    Write-Host "✓ Android 平台已存在" -ForegroundColor Green
}
Write-Host ""

# 步骤3: 同步代码
Write-Host "步骤 3/4: 同步 Web 代码到原生项目..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 同步失败" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 同步完成" -ForegroundColor Green
Write-Host ""

# 步骤4: 打开Android Studio
Write-Host "步骤 4/4: 准备打开 Android Studio..." -ForegroundColor Yellow
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  打包准备完成!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "接下来:" -ForegroundColor Yellow
Write-Host "1. 确保已安装 Android Studio" -ForegroundColor White
Write-Host "2. 运行以下命令打开 Android Studio:" -ForegroundColor White
Write-Host "   npx cap open android" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. 在 Android Studio 中:" -ForegroundColor White
Write-Host "   - 等待 Gradle 同步完成" -ForegroundColor White
Write-Host "   - 连接设备或启动模拟器" -ForegroundColor White
Write-Host "   - 点击运行按钮 ▶️" -ForegroundColor White
Write-Host ""
Write-Host "4. 生成 APK:" -ForegroundColor White
Write-Host "   Build → Build Bundle(s) / APK(s) → Build APK(s)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "是否现在打开 Android Studio? (y/n)"
if ($choice -eq 'y' -or $choice -eq 'Y') {
    Write-Host "正在打开 Android Studio..." -ForegroundColor Yellow
    npx cap open android
}

Write-Host ""
Write-Host "详细说明请查看: BUILD_APP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
