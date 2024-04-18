import {expect} from "@playwright/test";

export class ProfilePage {
    constructor(page) {
        this.page = page
        this.mySSLLogo = page.getByLabel('MY SSL')
        this.userEmailLabel = page.locator('//span[contains(text(), \'$s\')]')
        this.uesrNameInfo = page.locator('//div[contains(@ng-class,\'name\')]//div[@class=\'description\']/span')
        this.userEmailInfo = page.locator('//div[contains(@ng-class,\'name\')]//div[@class=\'description\']/span')
        this.userPasswordInfo = page.locator('//div[contains(@ng-class,\'password\')]//div[@class=\'description\']/span')
        this.userPhoneInfo = page.locator('//div[contains(@ng-class,\'phone\')]//div[@class=\'description\']/span')
        this.userAddressInfo = page.locator('//div[contains(@ng-class,\'address\')]//div[@class=\'description\']/span')
        this.userPinInfo = page.locator('//div[contains(@ng-class,\'pin\')]//div[@class=\'description\']/span')
        this.userNewsletterInfoOn = page.locator('//div[contains(@ng-class,\'newsletter\')]//div[@class=\'description\']/button[@class=\'toggle-btn on\']')

        this.descriptionInfo = page.locator('//div[@class=\'description\']')

        this.changeNameBtn = page.locator('//button[contains(@ng-disabled, \'name\')]')
        this.nameInputField = page.locator('//input[@name=\'name\']')
        this.lastNameInputField = page.locator('//input[@name=\'lastName\']')
        this.submitParamChange = page.locator('//div[@class=\'item edit\']//button[@type=\'submit\']')
    }

    async getProfileInfo() {
        return {
            name: this.uesrNameInfo.textContent(),
            email: this.userEmailInfo.textContent(),
            password: this.userPasswordInfo.textContent(),
            phone: this.userPhoneInfo.textContent(),
            address: this.userAddressInfo.textContent(),
            pin: this.userPinInfo.textContent(),
            newsletterInfo: this.userNewsletterInfoOn.isVisible()
        }
    }

    async changeProfileName(value) {

        await expect(this.changeNameBtn).toBeVisible()
        await this.changeNameBtn.click()
        if(value.includes(' ')){
            let nameAndSurname = value.split(' ')
            await this.nameInputField.fill(nameAndSurname.at(0).toString())
            await this.lastNameInputField.fill(nameAndSurname.at(1).toString())
        }else{
            await this.nameInputField.fill(value)
        }

        await this.submitParamChange.click()
    }

    async compareProfiles(profile1, profile2) {
        const keys1 = Object.keys(profile1);
        const keys2 = Object.keys(profile2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (profile1[key] !== profile2[key]) {
                return false;
            }
        }

        return true;
    }
}