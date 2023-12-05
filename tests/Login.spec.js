import { test, expect } from '@playwright/test';
import { UtilsClass } from '../pageobject/Utils';
import { baseUrl, setViewPortSize } from '../constants.config';
const { LoginPage } = require('../pageobject/Login.page');

test.beforeEach(async ({page}) => {
    const Utils = new UtilsClass(page)
    await Utils.setViewPortSize(setViewPortSize)
})

test('Prihlásenie sa s validnámy vstupmi', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.loginToAgel("test@netgrif.com", "password", baseUrl)
})

test('Prihlásenie s nevalidným prihlasovacím menom', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.loginToAgelInvalid("test4@netgrif.com", "password", baseUrl)
});

test('Prihlásenie s nevalidným heslom', async ({ page }) => {
    const Login = new LoginPage(page)
    await Login.loginToAgelInvalid("test@netgrif.com", "passwordha", baseUrl)
});


