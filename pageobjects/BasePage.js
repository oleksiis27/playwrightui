import { LoginPage } from "./LoginPage"
import { ProfilePage } from "./ProfilePage"

export class BasePage{

    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.profilePage = new ProfilePage(this.page)
        this.emailLogoBtn = page.getByRole('button', { name: ' ssls.automation+666@gmail.' })
    }

    getLoginPage() {
        return this.loginPage
    }

    getProfilePage() {
        return this.profilePage
    }
}