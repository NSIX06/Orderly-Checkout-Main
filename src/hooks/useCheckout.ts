import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";

export type Produto = Tables<"produtos">;
export type Pedido = Tables<"pedidos">;
export type ItemPedido = Tables<"itens_pedido">;

// ---- PRODUTOS ----

export function useProdutos() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCriarProduto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ nome, preco }: { nome: string; preco: number }) => {
      if (!nome.trim()) throw new Error("Nome do produto é obrigatório");
      if (preco < 0) throw new Error("Preço não pode ser negativo");
      const { data, error } = await supabase
        .from("produtos")
        .insert({ nome: nome.trim(), preco })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["produtos"] });
      toast({ title: "Produto criado com sucesso!" });
    },
    onError: (e: Error) => {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    },
  });
}

//*---- PEDIDOS ----

export function usePedidos() {
  return useQuery({
    queryKey: ["pedidos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("*, itens_pedido(*, produtos(*))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCriarPedido() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .insert({ status: "ABERTO" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pedidos"] });
      toast({ title: "Pedido criado!", description: "Status: ABERTO" });
    },
    onError: (e: Error) => {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    },
  });
}

export function useAdicionarItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pedidoId,
      produtoId,
      quantidade,
    }: {
      pedidoId: string;
      produtoId: string;
      quantidade: number;
    }) => {
      if (quantidade <= 0) throw new Error("Quantidade deve ser maior que zero");

      //*Check order status
      const { data: pedido, error: pedidoErr } = await supabase
        .from("pedidos")
        .select("status")
        .eq("id", pedidoId)
        .maybeSingle();
      if (pedidoErr) throw pedidoErr;
      if (!pedido) throw new Error("Pedido não encontrado");
      if (pedido.status === "FINALIZADO")
        throw new Error("Pedido finalizado não pode receber novos itens");

      //*Check product exists
      const { data: produto, error: prodErr } = await supabase
        .from("produtos")
        .select("id")
        .eq("id", produtoId)
        .maybeSingle();
      if (prodErr) throw prodErr;
      if (!produto) throw new Error("Produto não encontrado");

      const { data, error } = await supabase
        .from("itens_pedido")
        .insert({ pedido_id: pedidoId, produto_id: produtoId, quantidade })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pedidos"] });
      toast({ title: "Item adicionado!" });
    },
    onError: (e: Error) => {
      toast({ title: "Erro", description: e.message, variant: "destructive" });
    },
  });
}

export function useFinalizarPedido() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pedidoId: string) => {
      const { data, error } = await supabase
        .from("pedidos")
        .update({ status: "FINALIZADO" })
        .eq("id", pedidoId)
        .eq("status", "ABERTO")
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pedidos"] });
      toast({ title: "Pedido finalizado!" });
    },
    onError: (e: Error) => {
      toast({
        title: "Erro ao finalizar",
        description: e.message,
        variant: "destructive",
      });
    },
  });
}
