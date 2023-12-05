import { test, expect } from '@playwright/test';
import { ObjednavkaPage } from '../pageobject/Objednavka.page';
import { UtilsClass } from '../pageobject/Utils';
import { baseUrl, setViewPortSize } from '../constants.config';
const { LoginPage } = require('../pageobject/Login.page');

test('Objednavka - Schvalenie - Odoslanie', async ({ page }) => {
  const Login = new LoginPage(page);
  const Objednavka = new ObjednavkaPage(page);
  const Utils = new UtilsClass(page)

  await Utils.setViewPortSize(setViewPortSize)

  await test.step('Prihlásenie', async () => {
    await Login.loginToAgel("test@netgrif.com", "password", baseUrl);
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

  await test.step('Odoslanie objednávky', async () => {
    await Objednavka.kontrolaUdajovObj();
  }) 

});

