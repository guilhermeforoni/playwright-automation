import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  // 1. DECLARAÇÃO DE TIPOS (Atributos da Classe)
  readonly page: Page;
  readonly addBackpackButton: Locator;
  readonly removeBackpackButton: Locator;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;

  // 2. CONSTRUTOR: MAPEAMENTO DOS ELEMENTOS
  constructor(page: Page) {
    this.page = page;
    
    // Mapeia o botão de adicionar a mochila usando atributo customizado data-test
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Mapeia o botão de remover que aparece no lugar do botão de adicionar após o clique
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    
    // Mapeia a bolinha vermelha com o número indicador de itens no carrinho
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    
    // Mapeia o ícone do carrinho de compras no cabeçalho
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  // 3. MÉTODOS DE AÇÃO (INTERAÇÕES)
  async addBackpackToCart() {
    // .click() no Playwright espera o botão ficar visível e interativo antes de clicar
    await this.addBackpackButton.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpackButton.click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // 4. MÉTODOS DE VALIDAÇÃO (ASSERÇÕES DA PÁGINA)
  async validateCartBadgeCount(expectedCount: string) {
    // toHaveText() valida se o texto contido no elemento é idêntico ao esperado
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async validateCartBadgeNotExist() {
    // toBeHidden() garante que a bolinha de contador sumiu do DOM ou está invisível
    await expect(this.cartBadge).toBeHidden();
  }
}