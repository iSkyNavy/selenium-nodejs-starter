const { By, until } = require("selenium-webdriver");
const getBrowserDriver = require("../../../browsers/browserDriver");

const isDisabledButtonHelpers = {
    isDisabled: async (driver, user) => {
        try {
                const singInButton = await driver.findElement(By.linkText("Sign In"))
                await driver
                    .wait(until.elementIsVisible(singInButton), 2000)
                    .then( async () => { 
                        await singInButton.click()
                    })
                    .catch(() => console.log("There isn't link"));
                const createAccountLink = await driver.findElement(By.linkText("No account? Register here"))
                await driver
                    .wait(until.elementIsVisible(createAccountLink), 2000)
                    .then( async () => { 
                        await createAccountLink.click()
                    })
                    .catch(() => console.log("There isn't link to create account"));
                
                const firstnameInput = await driver.findElement(By.name("firstName"));
                await firstnameInput.sendKeys(user.firstname)
                const lastnameInput = await driver.findElement(By.name("lastName"))
                await lastnameInput.sendKeys(user.lastname);
                const emailInput = await driver.findElement(By.name("emailAddress"))
                await emailInput.sendKeys(user.email);
                const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Register')]"))
                await driver
                    .wait(until.elementIsVisible(submitButton), 2000)
                const buttonIsEnabled = await submitButton.isEnabled()
                // console.log(firstnameInput)
                const resp = await validateEnabled(firstnameInput, lastnameInput, emailInput, buttonIsEnabled)
                console.log(resp)
                if (resp) {
                    return "Success";
                }
                return "Error";
        } catch (error) {
            console.error(error)
            return "Error";
        }
    },
}

 const validateEnabled = async (firstname, lastname, email, buttonIsEnabled) => {
    const valueFirstname = await firstname.getAttribute("value")
    const valueLastname = await lastname.getAttribute("value")
    const valueEmail = await email.getAttribute("value")
    const countFirstname = valueFirstname.length
    const countLastname = valueLastname.length
    const countEmail = valueEmail.length
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
    const validateEmail = regx.test(valueEmail)
    if (((countEmail == 0 || countFirstname == 0 || countLastname == 0) || (!validateEmail)) && buttonIsEnabled) {
        return false
    }
    return true
}
/* const main = async () => {
    const driver = await getBrowserDriver()
    const user = {
        firstname:"sdsd",
        lastname:"ssa",
        email:"email@gmail.com"
    }
    await driver.get("http://localhost:4000/")
    await isDisabledButtonHelpers.isDisabled(driver, user)
    // await driver.quit()
}

main()
 */
module.exports = isDisabledButtonHelpers;