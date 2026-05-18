import { test, expect } from "@playwright/test";

import { getSignupPage } from "../support/pages/SignupPage";
import { getDashPage } from "../support/pages/DashPage";
import { getToast } from "../support/pages/components/Toast";

// import {faker} from '@faker-js/faker';
import { UserSignup, getNewUser } from "../support/fixtures/User";
// import Users from "../support/fixtures/Users.json"


test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {

    const signupPage = getSignupPage(page)
    const dashPage = getDashPage(page)
    const toast = getToast(page)

    const user: UserSignup = getNewUser();

    await signupPage.open()
    await signupPage.fill(user)
    await signupPage.submit()

    // await page.waitForTimeout(5000)


    await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
    await expect(toast.element()).toContainText('Conta criada com sucesso!')
    await expect(toast.element()).toContainText('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
});

test('não deve cadastrar quando nenhum campo é informado', async ({ page }) => {

    const signupPage = getSignupPage(page)
    const toast = getToast(page)


    await signupPage.open()
    await signupPage.submit()

    await expect(toast.element()).toContainText('Campos obrigatórios')
    await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')


})

test('não deve cadastrar quando o email for incorreto', async ({ page }) => {
    const signupPage = getSignupPage(page)
    const user: UserSignup = {
        name: 'Alex',
        username: 'Email incorreto',
        email: 'www.test.com.br',
        password: '123abc',
        confirmPassword: '123abc'
    }

    await signupPage.open()
    await signupPage.fill(user)
    await signupPage.submit()

    
    await expect(signupPage.emailField()).toHaveAttribute('type', 'email')
})

test('não deve cadastrar quando o username é incorreto', async ({ page }) => {

    const signupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'Alex',
        username: 'Alex&Espindola',
        email: 'ale@espindola.com',
        password: '123abc',
        confirmPassword: '123abc'
    }


    await signupPage.open()
    await signupPage.fill(user)
    await signupPage.submit()

    await expect(toast.element()).toContainText('Username inválido')
    await expect(toast.element()).toContainText('O username deve conter apenas letras, números e underscores.')


})

test('não deve cadastrar quando as senhas não são iguais', async ({ page }) => {

    const signupPage = getSignupPage(page)
    const toast = getToast(page)

    const user: UserSignup = {
        name: 'Alex',
        username: 'Alex_Espindola',
        email: 'ale@espindola.com',
        password: '123abc',
        confirmPassword: 'abc123'
    }


    await signupPage.open()
    await signupPage.fill(user)
    await signupPage.submit()

    await expect(toast.element()).toContainText('Senhas não coincidem')
    await expect(toast.element()).toContainText('A confirmação de senha deve ser igual à senha.')


})

