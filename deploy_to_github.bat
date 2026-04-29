@echo off
echo Deploying payment fixes and thank you page...
git add .
git commit -m "Premium Store Overhaul - Mobile Fixes and Product Galleries"
git push origin main
echo DONE! Please refresh your website in 1 minute.
pause
