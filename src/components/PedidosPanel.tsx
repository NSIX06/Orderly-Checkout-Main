import { useState } from "react";
import { ShoppingCart, Plus, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  usePedidos,
  useCriarPedido,
  useAdicionarItem,
  useFinalizarPedido,
  useProdutos,
} from "@/hooks/useCheckout";

export function PedidosPanel() {
  const { data: pedidos, isLoading } = usePedidos();
  const { data: produtos } = useProdutos();
  const criarPedido = useCriarPedido();
  const adicionarItem = useAdicionarItem();
  const finalizarPedido = useFinalizarPedido();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("1");

  const handleAddItem = (pedidoId: string) => {
    const qtd = parseInt(quantidade);
    if (!produtoId || isNaN(qtd) || qtd <= 0) return;
    adicionarItem.mutate(
      { pedidoId, produtoId, quantidade: qtd },
      {
        onSuccess: () => {
          setProdutoId("");
          setQuantidade("1");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Pedidos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => criarPedido.mutate()}
          disabled={criarPedido.isPending}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : pedidos && pedidos.length > 0 ? (
          <div className="space-y-3">
            {pedidos.map((pedido) => {
              const isOpen = pedido.status === "ABERTO";
              const isExpanded = expanded === pedido.id;
              const itens = (pedido as any).itens_pedido || [];

              return (
                <div
                  key={pedido.id}
                  className="rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => setExpanded(isExpanded ? null : pedido.id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={isOpen ? "default" : "secondary"}
                        className={isOpen ? "bg-primary" : "bg-success text-success-foreground"}
                      >
                        {pedido.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        #{pedido.id.slice(0, 8)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-lg">
                        R$ {Number(pedido.total).toFixed(2)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border px-4 py-3 space-y-3 bg-secondary/20">
                      {/* Items list */}
                      {itens.length > 0 ? (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                            Itens
                          </p>
                          {itens.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm py-1"
                            >
                              <span>
                                {item.produtos?.nome || "Produto"} × {item.quantidade}
                              </span>
                              <span className="text-muted-foreground">
                                R${" "}
                                {(
                                  Number(item.produtos?.preco || 0) * item.quantidade
                                ).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Nenhum item adicionado.
                        </p>
                      )}

                      {/* Add item form (only for open orders) */}
                      {isOpen && (
                        <div className="space-y-2 rounded-md border border-border bg-card p-3">
                          <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                            Adicionar Item
                          </p>
                          <div className="grid grid-cols-[1fr_80px] gap-2">
                            <Select value={produtoId} onValueChange={setProdutoId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o produto" />
                              </SelectTrigger>
                              <SelectContent>
                                {produtos?.map((p) => (
                                  <SelectItem key={p.id} value={p.id}>
                                    {p.nome} — R$ {Number(p.preco).toFixed(2)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div>
                              <Input
                                type="number"
                                min="1"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                placeholder="Qtd"
                              />
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddItem(pedido.id)}
                            disabled={adicionarItem.isPending || !produtoId}
                            className="w-full"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Adicionar
                          </Button>
                        </div>
                      )}

                      {/* Finalize button */}
                      {isOpen && (
                        <Button
                          variant="outline"
                          onClick={() => finalizarPedido.mutate(pedido.id)}
                          disabled={finalizarPedido.isPending}
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Finalizar Pedido
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum pedido criado.</p>
        )}
      </CardContent>
    </Card>
  );
}
