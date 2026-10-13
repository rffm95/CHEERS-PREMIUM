# CHEERS O BAR — Menu QR

Carta estática, sem instalação de dependências nem compilação. Português de Portugal, inglês, espanhol e francês. Produtos e preços vivem apenas em `menu.json`.

## Catálogo

95 produtos, preservados integralmente do commit de origem `f08c82a`. O menu Netlify observado em 13/10/2026 ainda tinha 97 produtos e informação anterior às correções autorizadas. A versão do repositório já inclui Mãos Douro a 25 €, Taittinger a 85 €, remoção de Hazelnut Espresso, Super Bock e San Miguel Fresca, e Tropical com Red Bull.

## Experiência

- Pesquisa global por nomes, marcas e ingredientes presentes nas descrições, com normalização de acentos. Os aliases antigos de Tropical não são usados para sugerir uma receita com maracujá.
- Categorias fixas, lista completa, acesso direto a cervejas, packs e bebidas premium.
- Fotografias existentes do Cheers nos destaques. Ilustrações apenas no detalhe, sempre identificadas. Não foram geradas novas imagens.
- Descoberta opcional por ingredientes confirmados, sem combinações automáticas de comida e bebida.
- Escolhas guardadas apenas no browser, sem encomendas, pagamento ou contas.
- Links diretos `#p=cock-moj` e `#c=beers`, partilha nativa ou cópia de link quando disponível.
- Diálogos nativos, foco visível e preferência de movimento reduzido. O cliente faz o pedido à equipa.

## Manutenção

Em `menu.json`, cada produto mantém `id` estável, `name` e `description` em `pt/en/es/fr`, `price` numérico, `category`, e opcionalmente `image`/`imageKind`. Categorias: `cocktails`, `beers`, `packs`, `gins`, `whiskeys`, `vodkas`, `shots`, `sangrias`, `wine`, `mocktails`, `food`.

Os destaques editoriais são configurados em `app.js` (`featuredIds`, `sharingIds`). Não constituem alegações de popularidade nem de margem. Traduções da interface estão em `i18n.js`. Evitar duplicar preços nesses ficheiros.

Novos ingredientes da descoberta devem ser validados contra as receitas em `menu.json` antes de atualizar `ingredientGroups`. Para ocultar ou eliminar produtos e alterar preços, obter decisão comercial do proprietário. Não existe painel administrativo público nem serviço pago.

## Pontos a validar pelo proprietário

Mantidos exatamente como na fonte: Adamus 2021 com «ÚLTIMAS UNIDADES»; nomes «Carduh», «Bellow 42», «The Macallan 12 Double Cask Cherry Woak»; sangria de espumante e morango com maracujá; pack de shots com maracujá **ou morango**. Confirmar estes dados antes de eventual correção. Não há categoria tequila nem refrigerantes no catálogo: não foram inventados produtos a partir de listas externas.

## Análise de rentabilidade

Exportar vendas por produto de um período representativo (por exemplo, 8 semanas). Recolher custo efetivo por dose/pack: bebida, mixer, fruta/guarnição, desperdício e restantes custos variáveis. Calcular margem de contribuição = preço líquido de IVA − custo variável líquido. Cruzar contribuição com unidades vendidas por categoria e período, identificando elevada/baixa margem e popularidade com limiares documentados. Sem esses dados, não classificar produtos nem prometer aumentos de vendas. Avaliar vendas por visita e ticket médio antes/depois em períodos comparáveis.

## Publicação

O workflow existente publica automaticamente pushes para `main` em GitHub Pages. Netlify é um destino separado: é necessário confirmar a ligação ao repositório para atualizar esse endereço.

Arquivos necessários: `index.html`, `style.css`, `app.js`, `i18n.js`, `menu.json`, `images/`, `.nojekyll` e o workflow existente. 
