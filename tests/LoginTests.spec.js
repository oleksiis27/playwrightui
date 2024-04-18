const {test, expect} = require('@playwright/test')
const {BasePage} = require('../pageobjects/BasePage')

const baseUrl = 'https://www.sbzend.ssls.com/'
const loginBtn = '//span[text()=\'Log in\']'
const startLogo = '//h1[text()=\'SSL for everyday people\']'
const loginData = JSON.parse(JSON.stringify(require('../testData/loginData.json')))

test.beforeEach(async ({page}) => {
    await page.goto(baseUrl)
    await expect(page.locator(startLogo)).toBeVisible()
    await page.locator(loginBtn).click()
})

test('@login Verify login with registered user', async({page})=>{
    const basePage = new BasePage(page)
    const loginPage = basePage.getLoginPage()
    await loginPage.performLogin(loginData.userRegisteredEmail, loginData.userRegisteredPassword)

    await expect(basePage.emailLogoBtn).toBeVisible()
})

test('@login Verify login with not registered user', async({page})=>{
    const errorMessageLabel = page.locator('//div[text()=\'Uh oh! Email or password is incorrect\']')
    const basePage = new BasePage(page)
    const loginPage = basePage.getLoginPage()
    await loginPage.performLogin(loginData.userNotRegisteredEmail, loginData.userNotRegisteredPassword)

    await expect(errorMessageLabel).toBeVisible()
})

test('@login Verify login with invalid email', async({page})=>{
    const errorMessageLabel = page.locator('//span[contains(text(), \'Uh oh! This\')]')
    const basePage = new BasePage(page)
    const loginPage = basePage.getLoginPage()
    await loginPage.userEmailField.fill(loginData.userNotValidEmail)

    await expect(errorMessageLabel).toBeVisible()
})