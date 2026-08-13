@echo off
title GitHub Deployer - Robust Sync
echo.
echo [1/4] Adding changes...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Git is not initialized or not found.
    pause
    exit /b
)

echo [2/4] Committing changes...
git commit -m "Fix: Mobile UI visibility and sync repo"

echo [3/4] Pulling latest updates from GitHub...
echo (This prevents the 'rejected' error by syncing your local code first)
git pull origin main

echo [4/4] Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo DONE! If you saw 'rejected', it should be fixed now.
echo Please refresh your site in 1 minute.
echo ==========================================
pause
