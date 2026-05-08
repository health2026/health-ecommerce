@echo off
title GitHub Deployer
echo.
echo [1/3] Adding changes...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not initialized.
    pause
    exit /b
)

echo [2/3] Committing...
git commit -m "Fix mobile UI and visibility"

echo [3/4] Pulling from GitHub...
git pull --rebase origin main

echo [4/4] Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo DONE! Please refresh your site in 1 minute.
echo ==========================================
pause
