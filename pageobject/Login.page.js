import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByPlaceholder('Prihlasovacie meno');
        this.passWord = page.getByPlaceholder('Zadajte svoje heslo')
        this.loginBtn = page. getByRole('button', { name: 'Prihlásiť' })
    }

    async loginToAgel(username, password, baseUrl) {
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('load', {timeout:15000});
        await expect(await this.userName).toBeVisible({timeout:15000})
        await this.userName.fill(username)
        await this.passWord.fill(password);
        await this.loginBtn.click();
        await this.page.waitForTimeout(1000);
        //await expect(await this.page.getByText('Nesprávne prihlasovacie údaje!')).toBeVisible()
        /* if (await this.page.getByText('Nesprávne prihlasovacie údaje!').isVisible()) {
            throw new Error('Nesprávne prihlasovacie údaje!');
        } */
        await expect(await this.page.getByText('Dashboard AGEL - local')).toBeVisible({timeout:10000});
    }

    async loginToAgelInvalid(username, password, baseUrl) {
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('load', {timeout:15000});
        await expect(await this.userName).toBeVisible({timeout:15000})
        await this.userName.fill(username)
        await this.passWord.fill(password);
        await this.loginBtn.click();
        await this.page.waitForTimeout(1000);
        await expect(await this.page.getByText('Nesprávne prihlasovacie údaje!')).toBeVisible()
        /* if (await this.page.getByText('Nesprávne prihlasovacie údaje!').isVisible()) {
            throw new Error('Nesprávne prihlasovacie údaje!');
        } */
        //await expect(await this.page.getByText('Dashboard AGEL - local')).toBeVisible({timeout:10000});
    }
}



