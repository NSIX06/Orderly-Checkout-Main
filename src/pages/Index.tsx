import { ShoppingBag } from "lucide-react";
import { ProdutosPanel } from "@/components/ProdutosPanel";
import { PedidosPanel } from "@/components/PedidosPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              Mini Checkout
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie produtos, monte pedidos e finalize.
            </p>
          </div>
        </div>
      </header>

      {/* Instruction banner */}
      <div className="container mx-auto px-4 pt-6">
        <div className="rounded-lg border border-info/30 bg-info/5 px-4 py-3 text-sm text-info">
          <strong>Fluxo:</strong> 1) Cadastre produtos → 2) Crie um pedido → 3) Adicione itens → 4) Finalize o pedido.
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto grid gap-6 px-4 py-6 md:grid-cols-2">
        <ProdutosPanel />
        <PedidosPanel />
      </main>
    </div>
  );
};

export default Index;
