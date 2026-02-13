# Welcome 
# Mini Checkout
## Project info
Sistema simples de checkout construído com **React + TypeScript + Supabase**.
## Funcionalidades
## How can I edit this code?
- **Cadastro de Produtos** — nome e preço
- **Criação de Pedidos** — status ABERTO / FINALIZADO
- **Adição de Itens** — vincula produtos a pedidos com quantidade
- **Finalização de Pedido** — bloqueia alterações e calcula total automaticamente
- **Cálculo automático de total** — trigger no banco recalcula ao adicionar/remover itens
There are several ways of editing your application.
## Stack
**Use Lovable**
| Camada    | Tecnologia                        |
| --------- | --------------------------------- |
| Frontend  | React 18, TypeScript, Vite        |
| Estilo    | Tailwind CSS, shadcn/ui           |
| Backend   | Supabase                          |
| Estado    | TanStack React Query              |

## Estrutura principal
Changes made via Lovable will be committed automatically to this repo.
```
src/
├── components/
│   ├── ProdutosPanel.tsx   # CRUD de produtos
│   └── PedidosPanel.tsx    # Gestão de pedidos e itens
├── hooks/
│   └── useCheckout.ts      # Hooks de dados (queries + mutations)
├── pages/
│   └── Index.tsx            # Página principal
└── integrations/
    └── supabase/            # Client e tipos (auto-gerados)
```
## Modelo de dados

produtos (id, nome, preco)
pedidos (id, status, total)
itens_pedido (id, pedido_id, produto_id, quantidade)
```
O unico requeirimento é ter Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
Segue o passo a passo:
## Rodando localmente
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>
# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>
# Step 3: Install the necessary dependencies.
npm i
# Step 4: Start the development server with auto-reloading and an instant preview.
git clone <URL_DO_REPO>
cd <NOME_DO_PROJETO>
npm install
npm run dev
```
**Edite um arquivo diretamente no GitHub**
O backend já está na nuvem — não precisa configurar nada extra.

## Fluxo de uso
**Use GitHub Codespaces**
1. Cadastre produtos com nome e preço
2. Crie um novo pedido (status: ABERTO)
3. Adicione itens ao pedido
4. Finalize o pedido
- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.
## Deploy
## Quais tecnologias foram usadas para esse projeto?
Esse projeto foi construído com:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
