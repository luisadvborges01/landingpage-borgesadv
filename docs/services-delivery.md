# Entrega das seis páginas de serviços
Revisão: 29/09/2026. Implementação local concluída; sem deploy e sem submissão ao IndexNow.

## Escopo e identidade
| Página | Composição e assinatura |
|---|---|
| Aposentadoria | Hub com mapa azul de possibilidades: histórico → regras → documentos → modalidades. Conexões para planejamento, rural e especial. |
| BPC/LOAS | Composição social, painel claro e percurso vertical por pessoa, condição, família, avaliação e documentos. Cadastro e renda recebem capítulos próprios. |
| Pensão por morte | Ritmo mais sóbrio, fluxo numerado com linhas discretas e linguagem sensível. Dependentes, vínculo e duração em capítulos separados. |
| Incapacidade | Comparação temporário/permanente em duas colunas no desktop e sequência no mobile. Documentos médicos precedem a explicação do procedimento. |
| Rural | Linha documental em fundo levemente quente, conectando período, atividade, local, documentos e coerência. Ênfase em reconstrução histórica. |
| Especial | Matriz técnica de atividade, agente, período e documento; ligação PPP/LTCAT. Explicação técnica vem antes do detalhamento das condições de exposição. |

Todos os recursos são HTML sem diagnóstico, cálculo, datas ou números fictícios. Os links conduzem aos capítulos pertinentes. FAQ nativa com `details/summary`, checklist local com inputs nativos e microinterações CSS. Conteúdo completo permanece disponível sem JavaScript. A tipografia e as cores seguem a identidade do piloto, sem Source Serif.

## Arquivos criados
- `src/pages/aposentadoria/index.astro`
- `src/pages/bpc-loas/index.astro`
- `src/pages/pensao-por-morte/index.astro`
- `src/pages/beneficio-por-incapacidade/index.astro`
- `src/pages/aposentadoria-rural/index.astro`
- `src/pages/aposentadoria-especial/index.astro`
- `src/layouts/ServiceLayout.astro`
- `src/data/services.ts`: textos, titles, descriptions, FAQs e links.
- `src/data/serviceSchema.ts`: WebPage/BreadcrumbList e entidades institucionais importadas da home.
- `src/styles/services.css`: composições e assinaturas responsivas.
- `src/components/services/ServiceHero.astro`
- `src/components/services/EditorialSection.astro`
- `src/components/services/ServiceFAQ.astro`
- `src/components/services/ServiceDocuments.astro`
- `src/components/services/ServiceMistakes.astro`
- `src/components/services/ServiceCTA.astro`
- `src/components/services/ServiceTimeline.astro`
- `src/components/services/OfficeIdentity.astro`
- `src/components/services/RelatedServices.astro`
- `src/components/services/EditorialSources.astro`
- `src/components/services/RetirementMap.astro`
- `src/components/services/BpcDiagram.astro`
- `src/components/services/PensionFlow.astro`
- `src/components/services/IncapacityComparison.astro`
- `src/components/services/RuralTimeline.astro`
- `src/components/services/SpecialMatrix.astro`
- `scripts/validate-services.mjs`
- `docs/services-validation.json`
- `docs/services-delivery.md` (este relatório).

## Arquivos alterados
- `astro.config.mjs`: lista do sitemap ampliada às oito URLs autorizadas.
- `src/components/Situations.jsx`: somente destinos dos quatro links de aposentadoria, incapacidade, BPC e pensão; home sem redesenho.
- `src/data/planning.ts`: LegalService e WebSite passam a usar exatamente os dados da home.
- `src/pages/planejamento-previdenciario/index.astro`: links contextuais para aposentadoria, rural e especial; sem mudança de design ou animação.
- `scripts/validate-planning.mjs`: expectativa de oito URLs no sitemap.
- `package.json`: comandos validate:planning e validate:services.
- `docs/planning-schema.json`: JSON-LD regenerado com a identidade institucional completa.

Preservados: robots.txt, verificação do Search Console, chave e implementação do IndexNow, canonical sem www, configuração de domínio, home visual, scripts/animações do piloto e cartões excluídos do sitemap.

## SEO e Schema
Titles e descriptions correspondem ao pedido. Valores finais de cada página, H1, canonical, assets, links e JSON-LD completo estão em [services-validation.json](./services-validation.json).
O teste compara profundamente o LegalService e o WebSite de cada página com os da home, incluindo CEP 74835-595, email, telefone, endereço, horário, Instagram e imagem.
Há WebPage, BreadcrumbList e breadcrumbs visíveis; rural e especial incluem o nível Aposentadoria. Não há FAQPage, reviews, aggregateRating, priceRange, noindex ou ilhas Astro nas sete páginas de serviço.

## Links internos
| Origem | Destinos de conteúdo |
|---|---|
| Home — situações | Aposentadoria, incapacidade, BPC, pensão; link de planejamento já existente preservado. |
| Aposentadoria | Planejamento, rural, especial. |
| Planejamento | Aposentadoria, rural, especial. |
| Rural | Aposentadoria, planejamento. |
| Especial | Aposentadoria, planejamento. |
| Incapacidade | BPC/LOAS. |
| BPC/LOAS | Incapacidade. |
| Pensão | Rural, no contexto de comprovação da atividade do falecido. |

Também há início, apresentação do escritório, localização, telefone e Instagram. CTAs WhatsApp usam o número institucional e mensagem específica do tema. Os testes conferem URL e texto, sem enviar mensagens.

## Sitemap final
O arquivo sitemap.xml preserva o índice gerado automaticamente e aponta ao sitemap-0.xml. Contém exatamente:
- https://borgesprev.com.br/
- https://borgesprev.com.br/planejamento-previdenciario/
- https://borgesprev.com.br/aposentadoria/
- https://borgesprev.com.br/bpc-loas/
- https://borgesprev.com.br/pensao-por-morte/
- https://borgesprev.com.br/beneficio-por-incapacidade/
- https://borgesprev.com.br/aposentadoria-rural/
- https://borgesprev.com.br/aposentadoria-especial/

Cartões e arquivos vCard são produzidos pelo build existente, mas não aparecem no sitemap.

## Performance
Tamanhos de recursos próprios finais; KB decimais. JSON-LD não é código executável.
| Página | JS próprio | CSS total | CSS gzip |
|---|---:|---:|---:|
| Aposentadoria | 0 B | 24.813 B | 6.363 B |
| BPC | 0 B | 24.813 B | 6.363 B |
| Pensão | 0 B | 24.813 B | 6.363 B |
| Incapacidade | 0 B | 24.813 B | 6.363 B |
| Rural | 0 B | 24.813 B | 6.363 B |
| Especial | 0 B | 24.813 B | 6.363 B |
| Planejamento | 467 B (300 B gzip) | 15.487 B | 4.002 B |

O CSS adicional compartilhado tem 9.326 B (2.361 B gzip). As seis novas páginas reutilizam os mesmos dois arquivos em cache. Não carregam React, GSAP ou Motion. Imagens WebP responsivas, dimensões explícitas e fotografia com lazy loading. O build inclui bundles da home já existente; isso não significa que sejam carregados nas páginas novas.

Não foi feita medição de Core Web Vitals em produção; os resultados acima são inspeção do build e teste local, não promessa de pontuação real.

## Testes
- `npm run build`: passou; Astro estático, 10 páginas HTML existentes + novas e rotas vCard.
- `npm run test:indexnow`: 5/5 testes passaram. Usa fetch simulado; nenhuma submissão real foi executada.
- `npm run validate:planning`: passou; nove FAQs, H1/canonical/Schema, preservação de robots/chave e sitemap.
- `npm run validate:services`: passou nas sete páginas; metadados exclusivos, imagens, labels, âncoras, links, WhatsApp, JSON-LD, ausência de hidratação e oito URLs.
- `git diff --check`: passou.
- Edge/Playwright local: 320, 375, 390, 430, 768, 1024 e 1440 px em cada uma das sete páginas. Sem overflow; imagens carregadas; FAQ abre/fecha por Enter; checklist funciona por Espaço; foco visível; reduced motion desativa rolagem suave e transições; conteúdo e interações nativas funcionam sem JS.
- Contraste: cálculo das cores computadas de textos visíveis com fundo opaco, limite 4,5:1 para texto comum e 3:1 para texto grande. Gradientes e conteúdo de FAQ recolhida não entram nessa amostragem. Isso é verificação básica, não certificação WCAG completa.
- Não foram realizados envios de formulários, mensagens ou testes de concessão/diagnóstico.

## Revisão jurídica e fundamentos
Foram usadas apenas fontes oficiais; referências também aparecem no rodapé de cada página. Nenhuma jurisprudência foi inventada.

| Tema | Tratamento editorial | Fundamento |
|---|---|---|
| Aposentadoria e histórico | Separação entre tempo e carência; CNIS corrigível mediante prova; responsabilidades contributivas distintas; transição não automática. | Lei 8.213/1991, arts. 24–27 e 29-A; Lei 8.212/1991, arts. 21 e 30; EC 103/2019, arts. 3 e 15–20; IN 128 e alterações. |
| BPC | Assistencial, idade de 65, deficiência e barreiras, grupo familiar legal, renda com exclusões, gastos sem deduções livres, cadastro sem concessão automática. | LOAS, arts. 20, 20-B e 40-B; Decreto 6.214/2007; orientações MDS/CadÚnico e biometria. |
| Pensão | Classes, proteção previdenciária até o óbito, ausência de carência distinta da duração, provas de união, efeitos da data do pedido. Equiparação de enteado, tutela e guarda judicial atualizada. | Lei 8.213/1991, arts. 15–16, 26, 74–77 e 102; art. 16 §2 na redação da Lei 15.108/2025; EC 103/2019. |
| Incapacidade | Diagnóstico não equivale à incapacidade; temporária versus permanente; reabilitação; carência e exceções; progressão/agravamento; decisões e procedimento individualizados. | Lei 8.213/1991, arts. 15, 25–26, 42, 59–62 e 101; Decreto 3.048/1999; IN 128/2022 e IN 212/2026. |
| Rural | Categoria não presumida; idades e atividade exigida contextualizadas; prova material, documentos familiares, autodeclaração e períodos urbanos. | Lei 8.213/1991, arts. 11, 38-B, 39, 48, 55 §3 e 106; Decreto 3.048/1999; IN 128/2022; página oficial do INSS sobre aposentadoria rural. |
| Especial | Profissão/adicional não garantem especialidade; PPP/LTCAT distintos; período e EPI contextualizados; conversão vedada para tempo posterior à reforma. | Lei 8.213/1991, arts. 57–58; EC 103/2019, arts. 3, 19, 21 e 25 §2; Decreto 3.048/1999; IN 128/2022; serviço oficial do PPP eletrônico. |

Fontes principais:
- [Lei 8.213/1991](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm)
- [Lei 8.212/1991](https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm)
- [EC 103/2019](https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm)
- [LOAS](https://www.planalto.gov.br/ccivil_03/leis/l8742.htm)
- [Regulamento da Previdência Social](https://www.planalto.gov.br/ccivil_03/decreto/d3048.htm)
- [Regulamento do BPC](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/decreto/d6214.htm)

Pontos que continuam dependentes de revisão do caso pelo escritório:
1. BPC: composição familiar, rendas excluídas, gastos admitidos, representação, exceções e cronogramas de biometria/cadastro.
2. Pensão: lei do óbito, duração, provas contemporâneas, dependência e condições de equiparação.
3. Incapacidade: data de início, manutenção/recuperação da qualidade, carência, reabilitação e procedimento vigente para cessação/prorrogação.
4. Rural: extensão da prova familiar, enquadramento em cada período, histórico misto e utilização em outro regime.
5. Especial: eficácia de EPI, metodologia técnica, documentos de empresa encerrada e enquadramento temporal.
6. Aposentadoria: aproveitamento de atrasados, complementações e simulações depende de categoria, época e finalidade.

Esses pontos são expressamente condicionados no conteúdo. A implementação não substitui a validação jurídica institucional para publicação.

## Capturas
As capturas desktop (1440) e mobile (390), completas e do topo, estão no diretório de artefatos desta conversa. O relatório `services-browser-report.json` registra os resultados por página e largura; `verify-services.cjs` contém o teste usado. Nenhum servidor de teste foi deixado em execução.

| Página | Desktop completo | Mobile completo |
|---|---|---|
| Aposentadoria | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-390-full.png) |
| BPC/LOAS | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/bpc-loas-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/bpc-loas-390-full.png) |
| Pensão | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/pensao-por-morte-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/pensao-por-morte-390-full.png) |
| Incapacidade | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/beneficio-por-incapacidade-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/beneficio-por-incapacidade-390-full.png) |
| Rural | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-rural-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-rural-390-full.png) |
| Especial | [Desktop](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-especial-1440-full.png) | [Mobile](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/aposentadoria-especial-390-full.png) |

[Prancha das seis assinaturas](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/services-signatures-desktop.png) · [Relatório de navegador](C:/Users/luisb/.codex/visualizations/2026/09/29/01a0ee14-2352-7363-b557-59098edea2dc/services-browser-report.json)
