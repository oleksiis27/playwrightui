const {test, expect} = require('@playwright/test')
const {BasePage} = require('../pageobjects/BasePage')

const baseUrl = 'https://www.sbzend.ssls.com/'
const loginBtn = '//span[text()=\'Log in\']'
const loginData = JSON.parse(JSON.stringify(require('../testData/loginData.json')))

test.beforeEach(async ({page}) => {
    await page.goto(baseUrl)
})

test('@profile Verify save without changes', async({page})=>{
    const basePage = new BasePage(page)
    const loginPage = basePage.getLoginPage()
    const profilePage = basePage.getProfilePage()
    await page.locator(loginBtn).click()
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword)

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click()

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoBefore = await grepProfileInfo(profilePage)

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.logoutBtn.click()

    await page.locator(loginBtn).click()
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword)

    await expect(basePage.emailLogoBtn).toBeVisible()

    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click()

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoAfter = await grepProfileInfo(profilePage)

    await expect(JSON.stringify(profileInfoBefore)).toBe(JSON.stringify(profileInfoAfter))
    //await expect(profilePage.compareProfiles(profileInfoBefore, profileInfoAfter)).toBe(true)
})

test('@profile Verify save name changes', async({page})=>{
    const basePage = new BasePage(page)
    const loginPage = basePage.getLoginPage()
    const profilePage = basePage.getProfilePage()
    await page.locator(loginBtn).click()
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword)

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click()

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoBefore = await grepProfileInfo(profilePage)

    let nameBeforeChanges = await profilePage.uesrNameInfo.textContent()

    await profilePage.changeProfileName('Sasha Petrov')

    await expect(basePage.emailLogoBtn).toBeVisible()
    await basePage.emailLogoBtn.click()
    await loginPage.logoutBtn.click()

    await page.locator(loginBtn).click()
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword)

    await expect(basePage.emailLogoBtn).toBeVisible()

    await basePage.emailLogoBtn.click()
    await loginPage.profileDropdownBtn.click()

    await expect(profilePage.uesrNameInfo).toBeVisible()
    let profileInfoAfter = await grepProfileInfo(profilePage)

    await expect(JSON.stringify(profileInfoBefore)).not.toBe(JSON.stringify(profileInfoAfter))

    //cleanup
    await profilePage.changeProfileName(nameBeforeChanges.trim())
})

async function grepProfileInfo(profilePage) {
    return profilePage.descriptionInfo.allTextContents()
}