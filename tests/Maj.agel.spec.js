import { test, expect } from '@playwright/test';
import DashboardAgelPage from '../pageobject/DashboardAgel.page';
import { MajPage } from '../pageobject/Maj.page';
import { data } from '../testdata/data';
import { UtilsClass } from '../pageobject/Utils';
import { baseUrl, setViewPortSize } from '../constants.config';
const { LoginPage } = require('../pageobject/Login.page');

test.beforeEach(async ({page}) => {
    const Utils = new UtilsClass(page)
    await Utils.setViewPortSize(setViewPortSize)
});

test('MAJ', async({page}) => {
    const Login = new LoginPage(page);
    const Maj = new MajPage(page);
    const DashBoardAgel = new DashboardAgelPage(page);


    await test.step('Prihlásenie', async () => {
        await Login.loginToAgel("super@netgrif.com", "password", baseUrl);
      });

    await test.step('Otvorenie MAJ',async () => {
        await DashBoardAgel.openMAJModule();
    });

    
    await test.step('Vyradenie z majetkovej evidencie', async() => {
        await Maj.addRequest(data)
    })

     await test.step('Schvaľovanie', async() => {
        await Maj.addApproval(data);
    }) 

});
/* 

    await test.step('Schvaľovanie', async() => {
        await Maj.addApproval(data);
    });

    await test.step('Potvrdenie účtovníkom', async() => {
        
    });

    await test.step('Archív - porovnanie dát', async() => {
        
    });

    await test.step('Archív - porovnanie dát', async() => {
        
    }); */





   
  /*   it('Schvaľovaie',async () => {
        await MajPage.addAprooval(data)
        await MajPage.addAprooval(data)
    });
    it('Potvrdenie účtovníkom',async () => {
        await MajPage.confirmBytheAccountant(data)
    });
    xit('Archív - porovnanie dát',async () => {
        await MajPage.compareArchiveData()
    });
 */