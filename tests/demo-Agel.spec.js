import { test, expect } from '@playwright/test';
import { ObjednavkaPage } from '../pageobject/Objednavka.page';
const { LoginPage } = require('../pageobject/Login.page');

test.describe('Objednávka', () => {
  test('Objednavka - Svhvalenie - Odoslanie', async ({ page }) => {
    //displej doma
    /* await page.setViewportSize({
      width: 1496,
      height: 967,
    });  */
    // displej v Prosofte
    await page.setViewportSize({
      width: 2056,
      height: 1129,
    });
    const Objednavka = new ObjednavkaPage(page);

    await test.step('Prihlásenie', async () => {
      const Login = new LoginPage(page);
      await Login.loginToAgel("test@netgrif.com", "password");
    })

    await test.step('Vytvorenie novej objednávky', async () => {
      await Objednavka.novaObjednavka();
    })

    await test.step('Zastupovanie', async () => {
      await Objednavka.zastupenie();
    })

    await test.step('Schválenie v zastupovaní', async () => {
      await Objednavka.schvalovanieVZastupeni();
    })

    await test.step('Zrušenie zastúpenia', async () => {
      await Objednavka.zrusenieZastupenia();

    })

    await test.step('Odoslanie objednávky', async () => {
      await Objednavka.odoslanieObjednavky();

    })
  });
});

test.describe('Login testy', () => {
  test.beforeEach(async ({page}) => {
    //displej doma

/* await page.setViewportSize({
width: 1496,
height: 967,
});  */
// displej v Prosofte
await page.setViewportSize({
width: 2056,
height: 1129,
});
})
test('Prihlásenie s validnými vstupmi', async ({ page }) => {
await test.step('Prihlásenie sa s validnámy vstupmi', async () => {
 const Login = new LoginPage(page)
 await Login.loginToAgel("test@netgrif.com", "password")
})

});

test('Prihlásenie s nevalidným prihlasovacím menom', async ({ page }) => {
 const Login = new LoginPage(page)
 await Login.loginToAgel("test4@netgrif.com", "password")
});

test('Prihlásenie s nevalidným heslom', async ({ page }) => {
const Login = new LoginPage(page)
await Login.loginToAgel("test@netgrif.com", "passwordha")
});
});

  