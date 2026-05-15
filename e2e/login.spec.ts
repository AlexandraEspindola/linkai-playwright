import { test, expect } from "@playwright/test";

import { getLoginPage } from "../support/pages/LoginPage";
import { getDashPage } from "../support/pages/DashPage";
import { getToast } from "../support/pages/components/Toast";
import { User, Users } from "../support/fixtures/User";
// import Users from "../support/fixtures/Users.json"


test('deve logar com sucesso', async ({ page }) => {

      const loginPage = getLoginPage(page)
      const dashPage = getDashPage(page)
      const toast = getToast(page)

      const user: User = Users.validUser

      await loginPage.open()
      await loginPage.submit(user)


      await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
      await expect(toast.element()).toContainText('Login realizado com sucesso!')
      await expect(toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
});


test('Nao deve logar com senha incorreta', async ({ page }) => {
      const loginPage = getLoginPage(page)
      const toast = getToast(page)

      const user: User = Users.wrongPassword

      await loginPage.open()

      await loginPage.submit(user)

      await expect(toast.element()).toContainText('Oops!');
      await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
});

test('Nao deve logar com usuario não cadastrado', async ({ page }) => {
      const loginPage = getLoginPage(page)
      const toast = getToast(page)

      const user: User = Users.userNotFound

      await loginPage.open()

      await loginPage.submit(user)

      // await page.waitForTimeout(1000) //pra ter certeza que o toast vai estar na pagina.
      // const html = await page.content()
      // writeFileSync('temp.html', html)

      // const toast = page.locator('.toast')

      await expect(toast.element()).toContainText('Oops!');
      await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
});

test('Nao deve logar quando não informo nenhum dos campos', async ({ page }) => {
      const loginPage = getLoginPage(page)
      const toast = getToast(page)

      const user: User = Users.emptyFields

      await loginPage.open()

      await loginPage.submit(user)

      await expect(toast.element()).toContainText('Campos obrigatórios');
      await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');
});

test('Nao deve logar quando não informo o usuário', async ({ page }) => {
      const loginPage = getLoginPage(page)
      const toast = getToast(page)

      const user: User = Users.missingUsername

      await loginPage.open()

      await loginPage.submit(user)

      await expect(toast.element()).toContainText('Campos obrigatórios');
      await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');
});

test('Nao deve logar quando não informo a senha', async ({ page }) => {
      const loginPage = getLoginPage(page)
      const toast = getToast(page)

      const user: User = Users.missingPassword

      await loginPage.open()

      await loginPage.submit(user)

      await expect(toast.element()).toContainText('Campos obrigatórios');
      await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');
});