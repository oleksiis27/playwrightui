import {expect} from "@playwright/test";

export class LoginPage {

    constructor(page) {
        this.page = page
        this.userEmailField = page.getByRole('textbox', { name: 'email', type: 'email' })
        this.userPasswordField = page.getByRole('textbox', {name:'password', type: 'password'})
        this.loginSubmitButton = page.getByText('Login')
        this.logoutBtn = page.locator('//button[text()=\' Log out\']')
        this.profileDropdownBtn = page.locator('//a[@href=\'/user/profile\']')
        this.passwordDisplayedField = page.locator('//div[@class=\'input-box password\']/input[@type=\'text\']')
        this.eyeBtn = page.locator('//button[contains(@ng-click, \'showPassword\')]')
    }

    async navigateUrl(baseUrl) {
        await this.page.goto(baseUrl);
    }

    async performLogin(userEmail, userPassword) {
        await this.userEmailField.fill(userEmail)
        await this.userPasswordField.fill(userPassword)
        await this.eyeBtn.click();
        await expect(this.passwordDisplayedField).toBeVisible()
        await this.loginSubmitButton.click()
        await this.page.waitForLoadState('networkidle')
    }
}