rm -rf dist
npm run build -- --base /lemmon-preview
cd dist
git init
git add .
git commit -m "deploy"
git remote add origin git@github.com:xlmoo12138/lemmon-preview.git
git branch -M main
git push -f origin main:main
echo "===================================部署成功====================================="
cd -
