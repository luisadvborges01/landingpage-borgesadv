# IndexNow

Host canônico: `https://borgesprev.com.br`.

Chave pública: `645afb922843d07af397741fac293c8f`.
O arquivo em `public/645afb922843d07af397741fac293c8f.txt` é copiado pelo Astro para a raiz do build, sem transformação. Não é um segredo e não é importado pelo código do navegador.

## Executar após publicar

Em uma máquina de CI ou administração com Node >=22.12, este checkout e as dependências de desenvolvimento instaladas (`npm ci`):

```sh
npm run build
# Publicar o build pelo fluxo normal e aguardar a aplicação ficar disponível.
curl -i https://borgesprev.com.br/645afb922843d07af397741fac293c8f.txt
npm run indexnow -- --dry-run
npm run indexnow
```

O primeiro GET precisa responder diretamente 200 com o corpo exatamente igual à chave. O script valida isso automaticamente; qualquer redirect/404 impede o POST. O sitemap publicado em `/sitemap.xml` e seus arquivos filhos também precisam responder diretamente 200.

A primeira execução envia apenas páginas elegíveis do sitemap atual. Execuções seguintes comparam SHA-256 do HTML público para enviar páginas novas ou alteradas. HTML idêntico não gera nova submissão. URLs previamente submetidas que saíram do sitemap só são notificadas como removidas após responderem diretamente 404 ou 410. Essa é a exceção necessária à regra de enviar páginas atualmente indexáveis: o protocolo aceita notificações de exclusão.

Cartões NFC, APIs, rotas internas, arquivos, assets, noindex por meta ou cabeçalho, redirects e páginas sem canonical correspondente são excluídos. O projeto tem URLs de páginas sem extensão; rotas com extensão são conservadoramente excluídas. Novas páginas também precisam ser aprovadas no filtro do sitemap em `astro.config.mjs`.

## Automatização no deploy

Não execute IndexNow no Docker build: a nova chave e as páginas ainda não estão publicadas nesse momento. A imagem final atual contém apenas Nginx, sem Node/npm. Não há pipeline nem acesso ao painel de hospedagem versionado neste repositório.

Configure o runner externo de deploy para executar, **depois do deploy bem-sucedido e da checagem de disponibilidade**:

```sh
npm run indexnow:postdeploy
```

Esse comando registra falhas com `[IndexNow] FALHA` e termina com código zero, mantendo o deploy bem-sucedido mesmo se a API estiver indisponível. O comando manual `npm run indexnow` retorna código 1 em falhas para facilitar diagnóstico. Nenhum envio é conectado ao `build`.

Persista `.indexnow/state.json` entre deploys (arquivo ignorado pelo Git), ou defina `INDEXNOW_STATE_FILE` com um caminho em armazenamento persistente no runner. Execute apenas um job por vez usando esse estado. Sem persistência, a execução equivale à primeira submissão: reenvia páginas atuais e não consegue detectar exclusões anteriores. Preserve o estado também ao trocar de runner; não publique esse arquivo no site. Em falhas de envio, o estado anterior é mantido e o próximo job pode tentar novamente. Em falhas do hook, reexecute o comando após resolver o problema.

Não é necessário alterar DNS, Nginx, sitemap ou robots para servir a chave: o Dockerfile já copia todo `dist` e o Nginx serve arquivos existentes na raiz.

## Resultado e testes

O log mostra status HTTP e lista exata de URLs por POST. `200` confirma recebimento; `202` indica recebimento com validação da chave pendente. Nenhum desses códigos garante indexação. IndexNow não substitui o Google Search Console.

```sh
npm run test:indexnow
npm run build
```

Os testes usam respostas simuladas (não enviam URLs à API) para verificar criação, atualização, remoção, exclusões, redirects, canonical, noindex, erros, persistência e simulação.

Protocolo: https://www.indexnow.org/documentation
