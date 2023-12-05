import { expect } from '@playwright/test';

export class MajPage {
    constructor(page) {
        this.page = page;
    }

    get removeFromRegistrySelector() {
        return this.page.locator('//span[text()="Vyradenie z majetkovej evidencie"]');
    }

    get plusButtonSelector() {
        return this.page.locator('//mat-icon[normalize-space()="add"]');
    }

    get addRequestFormSelector() {
        return this.page.locator('//span[text()="Zadanie požiadavky"]');
    }

    get approvalSelector() {
        return this.page.locator('span=Schvaľovanie');
    }

    get confirmBytheAccountantSelector() {
        return this.page.locator('span=Potvrdenie účtovníkom');
    }

    get completeBtnSelector() {
        return this.page.locator('span=DOKONČIŤ');
    }

    get uploadButton() {
        return this.page.locator('//input[../../div/div[text()=" Súbory na archiváciu "]]');
    }

    get pdfCreateSelector() {
        return this.page.locator('//button[span/div/div[text()=" Vytvoriť pdf zostavu "]]');
    }

    get archiveSelector() {
        return this.page.locator('//button[span/div/div[text()=" Archivovať "]]');
    }

    async removalFromRegistry() {
        await this.removeFromRegistrySelector.click();
        await this.page.getByText('Vyradenie z majetkovej evidencie0').click();
        await expect(await this.page.locator('//span[@class="mat-badge custom-badge mat-badge-overlap mat-badge-above mat-badge-after mat-badge-medium mat-badge-hidden" and (text()="Vyradenie z majetkovej evidencie")]')).toBeVisible()
    }

    async confirmBytheAccountant(data) {
    
            if (!await this.confirmBytheAccountantSelector.isVisible()) {
                await this.refreshPage()
            }
            await this.confirmBytheAccountantSelector.click()
            await this.setValuInField("Číslo dokladu v ESO9", data.cisloDokladuVESO9)
            await this.completeBtnSelector.scrollIntoView()
            await $("//input[../../div/span/label/mat-label[text()='Inventárne číslo v ESO9']]").click()
            const path = require('path');
            const relativeFilePath = path.join(__dirname, 'files', 'testFile.png');
            await this.uploadButton.addValue(relativeFilePath);
            await browser.pause(3000)
            await expect(await this.pdfCreateSelector).toBeDisplayed()
            await this.pdfCreateSelector.click()
            await expect(await $("//input[../span/label/mat-label[text()='Výsledok vytvorenia PDF zostavy']]")).toBeDisplayed()
            await expect(await this.pdfCreateSelector).toBeDisabled()
            await this.archiveSelector.click()
            await expect(await $("//input[../span/label/mat-label[text()='Výsledok archivácie']]")).toBeDisplayed()
            await this.archiveSelector.waitForEnabled({reverse: true})
            await this.completeBtnSelector.click()

    }

    async addRequest(data) {
        await this.removalFromRegistry();
        await this.plusButtonSelector.click();
        await this.addRequestFormSelector.click();
        await this.fillFieldsInAddRequest(data);
    }

    async addApproval(data) {
        if (!await this.page.getByText('Schvaľovanie').isVisible()) {
            await this.page.reload()
        await this.page.waitForTimeout(4000)

        }
        await this.page.getByText('Schvaľovanie').click();
        //await page.getByTestId('mat-expansion-panel-header-46').click();
        await this.page.getByText('Schvaľujem').click();
        await this.page.getByRole('button', { name: 'DOKONČIŤ' }).click();
        
        
        await this.approvalSelector.click()
        //Schválenie radiobutton
        await this.page.locator("span=" + data.schvalenie + "").click()
        //Priradenie, delegovanie...
        await this.page.locator("//button[span[text()=' " + data.priradenie + "']]").click()
        //console.log(caseNum); */
    }

    async fillFieldsInAddRequest(data) {
        await this.selectValuInField("ZZ", data.zz)
        await this.selectValuFromList("Stredisko", data.stredisko)

        await this.setValuInField("Skupina majetku", data.skupinaMajetkuDesc)
        await this.page.getByTestId('mat-option-26').click();

        await this.setValuInField("Názov majetku", data.nazovMajetku)
        await this.selectValuFromList("Dôvod vyradenia majetku", data.dovodVyradeniaMajetku)
        await this.setValuInField("Vstupná cena", data.vstupnaCena)
        await this.setValuInField("Zodpovedná osoba", data.zodpovednaOsoba)
        await this.page.getByLabel('Open calendar').click();
        await this.page.getByLabel('11th December 2023').click();
        await this.setValuInField("Inventárne číslo majetku", data.inventarneCIsloMajetku)
        await this.setValuInField("Zostatková cena", data.zostatkovaCena)
        await this.selectValuFromList("Spôsob vyradenia majetku", data.sposobVyradenia)
        await this.page.waitForTimeout(2000)
        await this.page.screenshot({ path: 'screenshot.png' + new Date(Date.now()) + '.png' })
        await this.page.waitForTimeout(2000)
        await this.page.getByRole('button', { name: 'DOKONČIŤ' }).click(); 
    }

    async setValuInField(fieldName, data) {
        await this.page.locator(`//input[../../div/span/label/mat-label[text()='${fieldName}']]`).click();
        await this.page.locator(`//input[../../div/span/label/mat-label[text()='${fieldName}']]`).fill(data);
        await this.page.keyboard.press('Backspace');
    }

    async selectValuInField(fieldName, data) {
        await this.page.locator("//div[span//label//mat-label[text()='" + fieldName + "']]").click()
        await this.page.locator("//input[../../div/span/label/mat-label[text()='" + fieldName + "']]").fill(data)
        await this.page.locator("//span[text()=' " + data + " ']").click()
    }

    async selectValuFromList(fieldName, data) {
        await this.page.locator("//div[span//label//mat-label[text()='" + fieldName + "']]").click()
        await this.page.getByText(""+data+"").click()
    }



    async refreshPage() {

    }
}

