#!/usr/bin/env bash
set -euo pipefail

# Executa sempre a partir da pasta deste site, mesmo quando chamado de outro local.
diretorio_projeto="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$diretorio_projeto"

echo "Atualizando os arquivos do site..."
git pull --ff-only origin main

echo "Instalando as dependências e gerando as páginas estáticas..."
npm ci
npm run build

# Remove também a configuração antiga que tentava executar a pasta como módulo Node.
if pm2 describe douglaspaianisite >/dev/null 2>&1; then
  pm2 delete douglaspaianisite
fi

echo "Iniciando o site na porta 3001..."
pm2 start ecosystem.config.cjs
pm2 save

echo "Site atualizado com sucesso."
