const { By, Key, until } = require("selenium-webdriver");

const registerHelper = {
    createAccount: async (driver, email, user) => {
        try {
            const singInButton = driver.findElement(By.className("login"))
            await driver
                .wait(until.elementIsVisible(singInButton), 3000)
                .then( async () => { 
                    await singInButton.click()
                })
                .catch(() => console.log("There isn't link"));
            
            await driver.sleep(3000);
            //New view to send Email
            const inputCreateEmail = await driver.findElement(By.name("email_create"))
            inputCreateEmail.sendKeys(email, Key.RETURN);
            const titlePersonalInformation = driver.findElement(By.className("page-subheading"))
            await driver.wait(until.elementIsVisible(titlePersonalInformation), 2000)
            await driver.sleep(10000);

            await driver.findElement(By.xpath("//input[@id=\"id_gender1\"]")).click();
            await driver.findElement(By.name("customer_firstname")).sendKeys(user.firstname);
            await driver.findElement(By.name("customer_lastname")).sendKeys(user.lastname);
            await driver.findElement(By.id("passwd")).sendKeys(user.password);
            
/*          await driver.findElement(By.id("firstname")).sendKeys("Test User");
            await driver.findElement(By.id("lastname")).sendKeys("Vsoft"); */
            await driver.findElement(By.id("company")).sendKeys(user.company);
            await driver.findElement(By.id("address1")).sendKeys(user.address);
            await driver.findElement(By.id("city")).sendKeys(user.city);

            const statedropdown= await driver.findElement(By.name("id_state"));
            statedropdown.click()
            await statedropdown.findElement(By.xpath(`//option[contains(text(), '${user.state}')]`)).click()
            statedropdown.click()

            await driver.findElement(By.name("postcode")).sendKeys(user.postal_code);
            
            const countrydropDown=driver.findElement(By.name("id_country"));
            countrydropDown.click()
            await countrydropDown.findElement(By.xpath(`//option[contains(text(), '${user.country}')]`)).click()
            countrydropDown.click()
            
            await driver.findElement(By.id("phone_mobile")).sendKeys(user.mobile_phone);
            await driver.findElement(By.xpath("//input[@name=\"alias\"]")).clear();
            await driver.findElement(By.xpath("//input[@name=\"alias\"]")).sendKeys(user.alias);
            await driver.findElement(By.name("submitAccount")).click();

            await driver.sleep(10000)
            const  userText = await driver.findElement(By.xpath("//*[@id=\"header\"]/div[2]/div/div/nav/div[1]/a")).getText();

            // Validate that user has created
            console.log(userText, "<<<<>>>>>")
            if(userText === (user.firstname + " " + user.lastname)) {
                console.log("Passed :)");
                return 1;
            }
            else {
                console.log("Failed :(");
                return 0;
            }

        } catch (error) {
            console.log(error)
        }
    }
}

/* const main = async () => {
    const driver = await getBrowserDriver()
    const email = "ramos.diegoar@gmail.com"
    await driver.get("http://automationpractice.com/index.php")
    await registerHelper.createAccount(driver, email)
}
main() */

module.exports = registerHelper