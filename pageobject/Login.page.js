import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByPlaceholder('Prihlasovacie meno');
        this.passWord = page.getByPlaceholder('Zadajte svoje heslo')
        this.loginBtn = page. getByRole('button', { name: 'Prihlásiť' })
    }
    async loginToAgel(username, password) {
        await this.page.goto('http://172.16.0.57:4201/login');
        //await this.page.goto('http://172.16.0.171:4201/dashboard')
        //await this.page.goto('http://172.16.0.57:4200/login');
        await this.page.waitForLoadState('load');


        await this.userName.fill(username)
        await this.passWord.fill(password);
        await this.loginBtn.click();
        await this.page.waitForTimeout(1000);
        if (await this.page.getByText('Nesprávne prihlasovacie údaje!').isVisible()) {
            throw new Error('Nesprávne prihlasovacie údaje!');
            
        }
    }
}



