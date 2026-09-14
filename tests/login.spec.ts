// test: É o executor do Playwright. 
//  - É ele quem gerencia os cenários (test()), agrupamentos (test.describe()) e ganchos de execução (test.beforeEach()).
// expect: É a biblioteca de asserções/validações nativa do Playwright. 
//  - Ela vem com o recurso de Auto-retrying (se um elemento demorar a aparecer, o expect tenta novamente automaticamente antes de falhar o teste).
// LoginPage: Importa a classe do Page Object.
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Importa a massa de dados do JSON
import userData from '../fixtures/users.json';


// O test.describe funciona exatamente como o describe do Cypress: agrupa testes relacionados a uma mesma funcionalidade.
// A linha let loginPage: LoginPage; declara uma variável tipada em TypeScript. Ela armazenará a instância da página de login para que todos os testes dentro desse bloco possam acessá-la.
test.describe('SauceDemo - Suíte de Login (Playwright + TS)', () => {
  let loginPage: LoginPage;

  // A Fixture { page }: O Playwright usa um sistema de Fixtures.
  //  - Quando colocamos { page } nos argumentos da função, o Playwright cria uma aba limpa e isolada do navegador especificamente para esse teste.
  // new LoginPage(page): Instancia o nosso Page Object passando a aba do navegador (page) criada pelo Playwright.
  // await loginPage.navigate(): Chama o método que acessa a URL [https://www.saucedemo.com/].
  //  - Como essa ação envolve rede e navegação, ela precisa do await para que o código só passe para a próxima linha quando a página terminar de carregar.
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // async ({ page }): Recebemos o objeto page para usá-lo na validação final de URL.
  // await loginPage.login(...): Executa a sequência de preencher usuário, senha e clicar no botão de login.
  test('Deve realizar login com sucesso usando usuário padrão', async ({ page }) => {
    await loginPage.login(userData.validUser.username, userData.validUser.password);

    // await expect(page).toHaveURL(/.*inventory.html/)
    //  - É a validação final (assertion). Verificamos se a URL do navegador mudou para a tela do catálogo (inventory.html).
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  // Neste teste não precisamos passar o { page } como argumento, porque usamos apenas os métodos do próprio loginPage
  test('Deve exibir mensagem de erro para usuário bloqueado', async () => {
    await loginPage.login(userData.lockedUser.username, userData.lockedUser.password);
    
    // await loginPage.validateErrorMessage(...) 
    //  - Chama o método criado na LoginPage.ts que valida se o alerta vermelho de erro apareceu e se contém o texto correto.
    await loginPage.validateErrorMessage(userData.lockedUser.errorMessage);
  });
});

