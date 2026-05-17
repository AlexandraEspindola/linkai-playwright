import { test, expect } from "@playwright/test";

import { getSignupPage } from "../support/pages/SignupPage";
import { getDashPage } from "../support/pages/DashPage";
import { getToast } from "../support/pages/components/Toast";
import { User } from "../support/fixtures/User";
// import Users from "../support/fixtures/Users.json"


test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {

    const signupPage = getSignupPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)

    const user: User = {
        name: "Alexandra Espindola",
        username: "espindola",
        email: "ale@espindola.dev",
        password: "123456"
    }

    await signupPage.open()
    await signupPage.submit(user)

    // await page.waitForTimeout(5000)


      await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
      await expect(toast.element()).toContainText('Conta criada com sucesso!')
      await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});


