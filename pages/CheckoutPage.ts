import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  // 1. DECLARAÇÃO DE ATRIBUTOS
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryItemName: Locator;
  readonly completeHeader: Locator;

  // 2. CONSTRUTOR
  constructor(page: Page) {
    this.page = page;
    
    // Etapa 1: Carrinho
    this.checkoutButton = page.locator('[data-test="checkout"]');
    
    // Etapa 2: Formulário de Informações
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
    // Etapa 3: Resumo e Finalização
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    
    // Etapa 4: Tela "Thank you for your order!"
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  // 3. MÉTODOS DE AÇÃO CONCATENADOS
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  // Método agregador: recebe os 3 campos e preenche sequencialmente
  async fillForm(firstName: string, lastName: string, postalCode: string) {
    // .fill() limpa o campo e insere o novo valor de forma instantânea
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  // 4. MÉTODOS DE VALIDAÇÃO DEDICADOS
  async validateSummaryItem(expectedProductName: string) {
    // Garante que o nome do produto no resumo do pedido confere com o que foi adicionado
    await expect(this.inventoryItemName).toHaveText(expectedProductName);
  }

  async validateOrderCompletion() {
    // toHaveURL aceita Expressões Regulares (Regex) para validar o redirecionamento de tela
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async validateErrorMessage(expectedText: string) {
    // toContainText verifica se a mensagem de erro contém o trecho passado
    await expect(this.errorMessage).toContainText(expectedText);
  }
}