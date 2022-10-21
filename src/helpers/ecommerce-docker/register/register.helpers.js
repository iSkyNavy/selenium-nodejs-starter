const { By, until } = require("selenium-webdriver");

const registerHelpers = {
    createAccount: async (driver, user) => {
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
                
                await driver.findElement(By.name("firstName")).sendKeys(user.firstname);
                await driver.findElement(By.name("lastName")).sendKeys(user.lastname);
                await driver.findElement(By.name("emailAddress")).sendKeys(user.email);
                const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Register')]"))
                await driver
                    .wait(until.elementIsVisible(submitButton), 2000)
                const buttonIsEnabled = await submitButton.isEnabled()
                if (buttonIsEnabled) {
                    await submitButton.click()
                    await driver.sleep(5000)
                    const confirmText = await driver.findElement(By.className("registration-sent"));
                    
                    if (confirmText) {
                        console.log("Complete!!!")
                        return "Success";
                    }
                    console.log("There are errors when you try register")
                    return "Error";
                }else{
                    console.log("Submit button is disabled, check your credentials")
                }
        } catch (error) {
            console.error(error)
            return "Error";
        }
    }
}


/* const main = async () => {
    const driver = await getBrowserDriver()
    const email = "ramos.diegoar@gmail.com"
    await driver.get("http://localhost:4000/")
    await registerHelpers.createAccount(driver, email)
    // await driver.quit()
}

main() */

module.exports = registerHelpers;