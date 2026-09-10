import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo - Fluxo Completo de Checkout (Playwright + TS)', () => {
  // Declara as variáveis que guardarão a instância de cada página
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  // SETUP: Executa antes de cada um dos testes deste bloco
  test.beforeEach(async ({ page }) => {
    // 1. Instancia as 3 páginas passando a mesma aba do navegador ({ page })
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    // 2. Realiza o pré-requisito: Acessa o site e efetua o login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // CENÁRIO 1: Fluxo de Sucesso (Happy Path)
  test('Deve realizar a compra de um produto com sucesso', async () => {
    // Passo A: Adiciona produto e vai para o carrinho
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    // Passo B: Inicia o checkout e preenche os dados do comprador
    await checkoutPage.clickCheckout();
    await checkoutPage.fillForm('Guilherme', 'Foroni', '38000-000');
    await checkoutPage.clickContinue();

    // Passo C: Valida os dados no resumo e confirma a compra
    await checkoutPage.validateSummaryItem('Sauce Labs Backpack');
    await checkoutPage.clickFinish();

    // Passo D: Valida a tela final de sucesso
    await checkoutPage.validateOrderCompletion();
  });

  // CENÁRIO 2: Fluxo de Exceção (Validação de Erro)
  test('Deve validar erro ao submeter formulário de checkout em branco', async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await checkoutPage.clickCheckout();
    // Clica em continuar sem preencher os campos obrigatórios
    await checkoutPage.clickContinue();

    // Valida se o alerta de obrigatoriedade do 'First Name' apareceu
    await checkoutPage.validateErrorMessage('Error: First Name is required');
  });
});