#!/ust/bin/env sh 

 # остановить публикацию при ошибках  
 set -e

 # сборка приложения   
 yarn build


  # иницализация репозитория и загрузка кода в gitHub 
 git init   
 git add .
 git commit  -m 'deploy'
 git remote add https://github.com/KulikNikita98/vue-app.git
 git branch -m main
 git push -u origin main:gh-pages



 cd -