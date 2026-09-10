import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // ==========================================
  // 1. ATRIBUTOS (Declaração de Tipos em TS)
  // ==========================================
  // O Playwright exige definir a tipagem do atributo `page` e de cada seletor (`Locator`)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // ==========================================
  // 2. CONSTRUTOR (Inicialização)
  // ==========================================
  // É executado sempre que criamos uma instância da página (`new LoginPage(page)`)
  constructor(page: Page) {
    this.page = page;
    
    // `page.locator()` no Playwright equivale ao `cy.get()` do Cypress.
    // A diferença é que ele apenas MAPEIA o elemento na memória, sem realizar busca ativa até que uma ação seja chamada.
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // ==========================================
  // 3. MÉTODOS DE AÇÃO (Com async / await)
  // ==========================================
  // No Playwright, toda interação com o navegador devolve uma 'Promise' (Promessa).
  // Por isso, todo método deve ser marcado como `async` e a ação deve ter `await`.

  async navigate() {
    // `page.goto()` equivale ao `cy.visit()`
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username: string) {
    // `.fill()` equivale ao `.type()` do Cypress (é até mais rápido pois preenche o valor de uma vez)
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    // `.click()` faz a rolagem automática se o botão não estiver visível na tela (Auto-waiting)
    await this.loginButton.click();
  }

  // Método agregador de ações
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // ==========================================
  // 4. MÉTODOS DE VALIDAÇÃO (Assertions)
  // ==========================================
  async validateErrorMessage(expectedMessage: string) {
    // O `expect()` no Playwright aguarda o elemento aparecer (Auto-retrying assertion)
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}