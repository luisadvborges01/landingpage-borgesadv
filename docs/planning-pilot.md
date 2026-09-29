# Página piloto — Planejamento Previdenciário

## Escopo

Implementada apenas `/planejamento-previdenciario/`. Nenhuma das outras seis páginas foi criada. A home recebeu somente um link no card existente de aposentadorias. Nenhuma publicação ou submissão de IndexNow foi realizada.

## Direção visual

A Source Serif 4 foi considerada como hipótese editorial. Sua diferenciação serifada trazia um caráter mais tradicional do que a identidade atual. Foi mantida a mesma pilha sans-serif da home (Inter, system UI e fallbacks), sem baixar fontes ou adicionar peso. O refinamento usa escala, entrelinha, espaço em branco, azul institucional, divisórias finas e áreas de leitura com largura controlada.

Desktop: hero em duas colunas, painel lateral contextual, percurso azul com três etapas horizontais, capítulos alternando colunas editoriais, cards documentais, comparação de premissas, FAQ e identificação real do escritório.

Mobile: hero em uma coluna, percurso vertical, documentos e erros empilhados, comparações sem tabela horizontal, controles nativos e margens de 16–20 px. Não há barra fixa cobrindo conteúdo.

## SEO final

- Title: Planejamento Previdenciário e análise do CNIS | Borges Advocacia
- Description: Saiba como o planejamento previdenciário organiza CNIS, contribuições e documentos para avaliar cenários de aposentadoria e orientar decisões.
- Canonical: https://borgesprev.com.br/planejamento-previdenciario/
- H1: Planejamento Previdenciário
- Open Graph: title, description e URL próprios; fotografia real da fachada como imagem social, com alt.
- JSON-LD final, extraído do HTML compilado: `planning-schema.json` nesta pasta.
- Entidades: WebPage, BreadcrumbList, LegalService e WebSite. Os identificadores institucionais existentes são preservados. Sem FAQPage, avaliações, credenciais novas ou data fictícia de revisão jurídica.
- Horário: texto público existente, segunda a sexta com consulta de disponibilidade. O piloto não replica o horário numérico do Schema antigo nem modifica a home.

## Links internos

- Home → piloto: link no card de aposentadorias.
- Piloto → `/`, `/#advogados`, `/#areas`, `/#localizacao`.
- Navegação local → `#percurso`, `#historico`, `#contribuicoes`, `#cenarios`, `#documentos`, `#erros`, `#duvidas`, `#contato`.
- Não existem links para as seis rotas ainda não implementadas.

## Validação

- `npm run build`: sucesso; quatro páginas HTML existentes no total, incluindo o piloto, além dos arquivos VCF.
- `npm run test:indexnow`: 5 testes aprovados. Sem envio externo.
- `node scripts/validate-planning.mjs`: verifica H1 único, idioma, canonical, ausência de noindex, IDs e âncoras, respostas de FAQ no HTML, dimensões/alt de imagens, labels, ausência de ilhas React, Schema, sitemap e preservação de robots e chave IndexNow.
- Sitemap: home e piloto, ambas no domínio sem www; cartões continuam excluídos. `sitemap.xml` mantém a cópia do índice gerado pela integração existente.
- JS próprio inline: 467 bytes; aproximadamente 300 bytes gzip.
- CSS carregado pelo piloto: 15.487 bytes; aproximadamente 4.002 bytes gzip. Nenhum JS de React/Motion/GSAP no piloto.
- Fotografias derivadas em WebP: fachada responsiva e retratos reduzidos; width/height explícitos e lazy loading abaixo da dobra.
- Edge headless: 320, 375, 390, 430, 768, 1024 e 1440 px sem overflow horizontal; imagens carregadas; nenhum erro de JavaScript.
- Teclado: FAQ abre/fecha com Enter; checklist funciona com Espaço; links do percurso levam aos capítulos.
- Sem JavaScript: percurso, FAQ e checklist funcionam; conteúdo permanece disponível.
- Movimento reduzido: scroll suave e transições desativados.
- Contraste dos pares principais: mínimo medido 6,45:1, acima de 4,5:1 para texto normal.
- Screenshots desktop e mobile produzidos no diretório de artefatos da conversa, fora do repositório.

Essa verificação é básica e não equivale a uma auditoria WCAG completa, teste com leitor de tela ou medição de Core Web Vitals em campo. Não foi atribuído score Lighthouse.

## Revisão jurídica editorial

A revisão textual solicitada foi aplicada em 29/09/2026. As correções, fundamentos oficiais, alterações normativas consultadas e questões dependentes do caso estão registradas em `planning-legal-review.md`. A redação do atendimento agora vincula a análise e as providências ao serviço previamente combinado e explicita a ausência de promessa de concessão, aumento de benefício ou economia.

O conteúdo evita percentuais, valores, idades, prazos e conclusões individuais. Os dois exemplos são explicitamente hipotéticos. A indicação de fontes consultadas não representa revisão jurídica já realizada por Rodrigo ou Ariane.

Fontes: Lei 8.213/1991, EC 103/2019, serviço oficial de simulação de aposentadoria e orientação do INSS sobre regularização de contribuições, com links na página.
