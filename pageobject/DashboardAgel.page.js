const { expect } = require('@playwright/test');

class DashboardAgelPage {
    constructor(page) {
        this.page = page;
        this.dashBoardAgelHeader = page.locator('//div[text()="MAJ"]');
    }

    async openMAJModule() {
        await this.dashBoardAgelHeader.click();
        await expect(this.page.getByRole('img', { name: 'Logo' })).toBeVisible();
    }
}

module.exports = DashboardAgelPage;
