const verifyEmailHelper = {
    veriryEmail: async (driver, email) => {
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
            
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = verifyEmailHelper