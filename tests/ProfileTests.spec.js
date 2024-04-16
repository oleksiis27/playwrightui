const {test, expect} = require('@playwright/test')
const {BasePage} = require('../pageobjects/BasePage')

const baseUrl = 'https://www.sbzend.ssls.com/'
const loginBtn = '//span[text()=\'Log in\']'
const loginData = JSON.parse(JSON.stringify(require('../testData/loginData.json')))

test.beforeEach(async ({page}) => {
    await page.goto(baseUrl);
})

test('@profile Verify save changes', async({page})=>{
    const basePage = new BasePage(page);
    const loginPage = basePage.getLoginPage();
    const profilePage = basePage.getProfilePage();
    await page.locator(loginBtn).click();
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword);

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click();

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoBefore = await profilePage.getProfileInfo()

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.logoutBtn.click();

    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword);

    await expect(basePage.emailLogoBtn).toBeVisible()

    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click();

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoAfter = await profilePage.getProfileInfo()

    await expect(profilePage.compareProfiles(profileInfoBefore, profileInfoAfter)).toBe(true)
});