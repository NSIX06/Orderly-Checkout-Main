import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProdutos, useCriarProduto } from "@/hooks/useCheckout";

export function ProdutosPanel() {
  const { data: produtos, isLoading } = useProdutos();
  const criarProduto = useCriarProduto();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum < 0) return;
    criarProduto.mutate(
      { nome, preco: precoNum },
      { onSuccess: () => { setNome(""); setPreco(""); } }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Package className="h-5 w-5 text-primary" />
          Produtos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="nome-produto">Nome</Label>
              <Input
                id="nome-produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Camiseta"
                required
              />
            </div>
            <div>
              <Label htmlFor="preco-produto">Preço (R$)</Label>
              <Input
                id="preco-produto"
                type="number"
                step="0.01"
                min="1"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="29.90"
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={criarProduto.isPending} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Produto
          </Button>
        </form>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : produtos && produtos.length > 0 ? (
          <div className="space-y-2">
            {produtos.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 transition-colors hover:bg-secondary/50"
              >
                <span className="font-medium">{p.nome}</span>
                <span className="font-display font-semibold text-primary">
                  R$ {Number(p.preco).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum produto cadastrado.</p>
        )}
      </CardContent>
    </Card>
  );
}
