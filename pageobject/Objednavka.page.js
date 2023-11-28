import { test, expect } from '@playwright/test';

let objednavkaCislo;
let extrahovaneCisloObjednavky;

export class ObjednavkaPage {
    constructor(page) {
        this.page = page;

    }

    async extrahujCisla(number) {
        return number.match(/\d+/g);
    }

    async novaObjednavka() {
        await this.page.getByText('Objednavky').click();
        await this.page.getByText('Nová objednávka').click();
        await this.page.locator('button').filter({ hasText: /^add$/ }).click();
        await expect(await this.page.getByRole('heading', { name: 'Vytvorenie novej objednávky' })).toBeVisible()

        await this.page.getByLabel('Autocomplete').click();
        await this.page.getByLabel('Autocomplete').fill('Kromp');
        await this.page.getByRole('option', { name: 'Nemocnica AGEL Krompachy s.r.o.' }).click();
        await this.page.getByRole('button', { name: 'POKRAČOVAŤ' }).click();
        await this.page.waitForTimeout(2000);
        if (await this.page.locator('//span[text()="Pre tento filter nie sú vyhovujúce žiadne úlohy"]').isVisible()) {
            await this.page.reload()
            await this.page.waitForTimeout(2000)
            console.log("objednavka sa nevytvorila");
        }
        await this.page.locator('#mat-input-6').click();
        await this.page.getByPlaceholder('Prosím zadajte aspoň 4 znaky').click();
        await this.page.getByPlaceholder('Prosím zadajte aspoň 4 znaky').fill('Vict');
        await this.page.getByRole('option', { name: 'VICTOR, s.r.o., 36444472' }).click();
        await expect(await this.page.getByRole('button', { name: 'Hľadať v OR' })).toBeVisible()
        await this.page.waitForTimeout(2000);
        await this.page.locator('#mat-chip-list-input-0').click();
        await this.page.keyboard.insertText('Odd')
        await this.page.keyboard.press('Backspace');
        await this.page.getByRole('option', { name: 'Odd. vnutorného lekárstva I., 100101' }).click();
        await this.page.getByLabel('Predmet objednávky *').click();
        await this.page.getByLabel('Predmet objednávky *').fill('Test Objednavky');
        await this.page.locator('#mat-input-19').click();
        await this.page.locator('#mat-input-19').fill('adm');
        await this.page.getByRole('option', { name: 'admin' }).click();
        await this.page.locator('#mat-input-20').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#mat-input-20').fill('admin')
        //await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Backspace');
        await this.page.getByRole('option', { name: 'Admin: Darovacie zmluvy' }).click();
        await this.page.getByLabel('Tel. č. zadávateľa *').click();
        await this.page.getByLabel('Tel. č. zadávateľa *').fill('12345');
        await this.page.locator('button').filter({ hasText: 'add_circle' }).click();
        await this.page.getByLabel('Typ položky *').click();
        await this.page.getByRole('option', { name: 'tovar' }).click();
        await this.page.locator('#mat-input-62').click();
        await this.page.locator('#mat-input-62').fill('moni');
        await this.page.getByRole('option', { name: '1715-9002 - Monitor' }).click();
        await this.page.getByLabel('Jednotková cena *').click();
        await this.page.getByLabel('Jednotková cena *').fill('500');
        await expect(await this.page.getByRole('button', { name: 'ODOSLAŤ NA SCHVÁLENIE' })).toBeEnabled();
        await expect(await this.page.getByText('Dáta úspešne uložené')).not.toBeVisible();
        await this.page.waitForTimeout(2000)
        await this.page.getByRole('button', { name: 'ODOSLAŤ NA SCHVÁLENIE' }).click();
        await this.page.waitForTimeout(2000)
        await this.page.getByRole('button', { name: 'ODOSLAŤ NA SCHVÁLENIE' }).click();
        await this.page.waitForTimeout(2000);
        /* let counter = 0;
        while (await this.page.locator('//span[text()="Pre tento filter nie sú vyhovujúce žiadne úlohy"]').isVisible()) {
            await this.page.reload()
            await this.page.waitForTimeout(2000)
            console.log("objednavka sa nevytvorila");
            counter +=1
            if (counter == 10) {
                throw new Error('Objednavka sa nevytvorila')
            }
        } */
        /*  if (await this.page.locator('(//span[../../../../div/ac-panel-item/span/span[text()="Vytvoriť kópiu z objednávky"]])[1]').isHidden({timeout:5000})) {
             throw new Error('V tomto kroku sa malo zobraziť číslo vygenerovanej objednávky');
         } */
        objednavkaCislo = await this.page.locator('(//span[../../../../div/ac-panel-item/span/span[text()="Vytvoriť kópiu z objednávky"]])[1]').innerText({ timeout: 5000 });
        extrahovaneCisloObjednavky = await this.extrahujCisla(objednavkaCislo);

        while (await this.page.locator('//span[text()="Prehľad schvaľovania"]').isHidden()) {
            await this.page.reload()
            await this.page.locator('//span[text()="' + objednavkaCislo + '"]').click()
            await this.page.waitForTimeout(2000)
        }
        await this.page.locator('//span[text()="Prehľad schvaľovania"]').click();
        await this.page.getByRole('button', { name: 'DOKONČIŤ' }).click();
    }

    async zastupenie() {
        await this.page.locator('button').filter({ hasText: 'account_circle' }).click();
        await this.page.getByRole('menuitem', { name: 'Zastúpiť' }).click();
        await this.page.getByPlaceholder('Zvoľte používateľa').click();
        await this.page.getByPlaceholder('Zvoľte používateľa').fill('Tomas Luckai');
        await this.page.getByText('account_circleTomáš Lučkaitomas.luckai@agel.sk').click();
        await this.page.getByRole('button', { name: 'ZASTÚPIŤ' }).click();
        //await this.page.getByRole('button', { name: 'ZASTÚPIŤ' }).click();
        await expect(await this.page.getByText('User Test (v zastúpení za Tomáš Lučkai)')).toBeVisible({ timeout: 10000 });
    }

    async schvalovanieVZastupeni() {
        await this.page.getByText('Objednavky').click();
        await this.page.getByText('done_allSchvaľovania').click();
        //await this.page.waitForTimeout(2000);

        /* for (let index = 1; index < 15; index++) {

            console.log(await this.page.locator('//div/ac-case-panel'+index+']/ac-app-panel/mat-expansion-panel/mat-expansion-panel-header/span/div/div/ac-panel-item/span/span[contains (text(),"'+ extrahovaneCisloObjednavky + '")]').isVisible());

            if (await this.page.locator('//div/ac-case-panel'+index+']/ac-app-panel/mat-expansion-panel/mat-expansion-panel-header/span/div/div/ac-panel-item/span/span[contains (text(),"'+ extrahovaneCisloObjednavky + '")]').isVisible()) {
                await this.page.locator('//div/ac-case-panel'+ index +']/ac-app-panel/mat-expansion-panel/mat-expansion-panel-header/span/div/div/ac-panel-item/span/span[contains (text(),"'+ extrahovaneCisloObjednavky +'")]').click();
                break;
            }
        } */
        await this.page.locator('//div/ac-case-panel[1]/ac-app-panel/mat-expansion-panel/mat-expansion-panel-header/span/div/div/ac-panel-item/span/span[contains (text(), "' + extrahovaneCisloObjednavky + '")]').click();
        await this.page.getByText('Schvaľujem').nth(1).click();
        await this.page.getByRole('button', { name: 'DOKONČIŤ' }).click();

        // ------- TODO --------
        //await expect(this.page.locator('//div[@class="snack-bar-container"]//span[@text="Úloha bola úspešne dokončená"]')).toBeVisible();
    }

    async zrusenieZastupenia() {
        await this.page.locator('button').filter({ hasText: 'account_circle' }).click();
        await this.page.getByRole('menuitem', { name: 'Zrušiť zastúpenie' }).click();
        await expect(await this.page.getByText('Zastupovanie bolo úspešne deaktivované')).toBeVisible();

        await this.page.getByText('Objednavky').click();
        await this.page.getByText('descriptionMoje objednávky').click();
        await this.page.getByText('note_addNová objednávka').click();
    }

    async odoslanieObjednavky() {
        let counter = 0;
        while (!await this.page.locator('//span[@ng-reflect-message="Objednávka ' + extrahovaneCisloObjednavky + '"]').isVisible({ timeout: 8000 })) {
            await this.page.reload();
            await this.page.waitForTimeout(4000)
            counter += 1;
            if (counter == 10) {
                throw new Error("Nepodarilo sa načítať zoznam objednávok pred odoslaním!")
            }
        }
        await expect(await this.page.locator('//span[@ng-reflect-message="Objednávka ' + extrahovaneCisloObjednavky + '"]')).toBeVisible({ timeout: 10000 })
        await this.page.getByPlaceholder('Zadajte hľadaný text').click();
        await this.page.getByPlaceholder('Zadajte hľadaný text').fill('Objednávka ' + extrahovaneCisloObjednavky + '');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        await expect(await this.page.locator('//span[@ng-reflect-message="Objednávka ' + extrahovaneCisloObjednavky + '"]')).toBeVisible()
        while (await this.page.locator('//span[@class="mat-tooltip-trigger panel-text text-column-ellipsis ng-star-inserted" and (text()="✅ schválená")]').isHidden({ timeout: 3000 })) {
            await this.page.reload();
            await this.page.waitForTimeout(3000);
            await this.page.getByPlaceholder('Zadajte hľadaný text').click();
            await this.page.getByPlaceholder('Zadajte hľadaný text').fill('Objednávka ' + extrahovaneCisloObjednavky + '');
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(2000);
        }
        await expect(await this.page.locator('//span[@class="mat-tooltip-trigger panel-text text-column-ellipsis ng-star-inserted" and (text()="✅ schválená")]')).toBeVisible({ timeout: 2000 });

        await this.page.locator('//span[@class="mat-tooltip-trigger panel-text text-column-ellipsis ng-star-inserted" and (text()="Objednávka ' + extrahovaneCisloObjednavky + '")]').click();

        await this.page.getByRole('button', { name: 'Objednávka ' + extrahovaneCisloObjednavky + ' Odoslanie high' }).click();

        await this.page.getByRole('button', { name: 'DOKONČIŤ' }).click();
        await expect(await this.page.getByRole('button', { name: 'Objednávka ' + extrahovaneCisloObjednavky + ' Zobraziť objednávku low' })).toBeVisible()

        /* await this.page.locator('#mat-input-2').fill('Objednávka '+extrahovaneCisloObjednavky+'');
        await this.page.keyboard.press('Enter')
        await expect(await this.page.locator('//span[@ng-reflect-message="Objednávka '+extrahovaneCisloObjednavky+'"]')).toBeVisible()
        await expect(await this.page.locator('//span[@class="mat-tooltip-trigger panel-text text-column-ellipsis ng-star-inserted" and (text()="✅ schválená")]')).toBeVisible();
        await this.page.locator('//span[@ng-reflect-message="Objednávka '+extrahovaneCisloObjednavky+'"]').click()
 */
    }

}


