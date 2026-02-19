# Bem-vindo!
Orderly Checkout - Mini Sistema de
Pedidos
Este projeto é um mini sistema de e-commerce focado na gestão de produtos e
pedidos, desenvolvido para a disciplina de Qualidade de Software. O sistema permite
o cadastro de produtos, criação de pedidos, adição de itens e finalização de vendas
com cálculo automático de totais.
🚀
Como Rodar o Projeto
Pré-requisitos
Node.js (v ou superior)
npm ou pnpm
Passo a Passo
. Clonar o repositório:
git clone https://github.com/NSIX06/orderly-checkout-main.git
cd orderly-checkout-main
. Instalar dependências:
npm install
. Rodar em modo de desenvolvimento:
npm run dev
O projeto estará disponível em 
http://localhost:8080 (ou na porta indicada
no terminal).
. Executar testes automatizados:
npm test
🛣
Rotas e Endpoints (Integração Supabase)
O projeto utiliza o Supabase como Backend-as-a-Service (BaaS). As interações
ocorrem através da biblioteca cliente do Supabase, mapeando para as seguintes
operações no banco de dados:
Produtos
Listar Produtos: 
GET /rest/v1/produtos (via 
Criar Produto: 
useProdutos )
POST /rest/v1/produtos (via 
useCriarProduto )
Pedidos
Payload: 
{ "nome": string, "preco": number }
Listar Pedidos: 
GET /rest/v1/pedidos?
select=*,itens_pedido(*,produtos(*)) (via 
Criar Pedido: 
usePedidos )
POST /rest/v1/pedidos (via 
useCriarPedido )
Status inicial: 
ABERTO
Adicionar Item: 
POST /rest/v1/itens_pedido (via 
Payload: 
useAdicionarItem )
{ "pedido_id": UUID, "produto_id": UUID, "quantidade":
number }
Finalizar Pedido: 
PATCH /rest/v1/pedidos?id=eq.{id} (via
useFinalizarPedido )
Atualiza status para 
FINALIZADO
�
�
Tecnologias Utilizadas
Frontend: React + TypeScript + Vite
UI: Tailwind CSS + shadcn/ui
Backend/Banco de Dados: Supabase (PostgreSQL)
Gerenciamento de Estado: TanStack Query (React Query)
Testes: Vites
