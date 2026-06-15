#!/bin/bash
set -e

FOLDER="/Users/luizbrito/Desktop/CD/scd-rmkt"
REPO="https://github.com/luizgbrito/scd.git"

cd "$FOLDER"

# Init git se necessário
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Configura remote
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REPO"
else
  git remote add origin "$REPO"
fi

# Commit e push
git add .
git commit -m "feat: landing page scd-rmkt" || echo "Nada novo para commitar."
git push -u origin main

echo ""
echo "Push concluido! Acesse: https://github.com/luizgbrito/scd"
read -p "Pressione Enter para fechar..."
