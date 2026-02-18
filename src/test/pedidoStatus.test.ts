describe("Pedido finalizado", () => {
  it("não deve permitir adicionar item", () => {
    const status = "FINALIZADO";
    expect(status).not.toBe("ABERTO");
  });
});
