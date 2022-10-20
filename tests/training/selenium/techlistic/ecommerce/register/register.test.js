const getBrowserDriver = require("../../../../../../src/browsers/browserDriver");
const registerHelper = require ("../../../../../../src/helpers/ecommerce/register.helpers")

const email =  process.env.email_to_create_account
const  firstname = process.env.firstname
const  lastname = process.env.lastname
const  password = process.env.password
const  address = process.env.address
const  city = process.env.city
const  state = process.env.state
const  postal_code = process.env.postal_code
const  country = process.env.country
const  mobile_phone = process.env.mobile_phone
const  alias = process.env.alias
const  company = process.env.company

const user = {
    "firstname":firstname,
    "lastname":lastname,
    "password":password,
    "address":address,
    "city":city,
    "state":state,
    "postal_code":postal_code,
    "country":country,
    "mobile_phone":mobile_phone,
    "alias":alias,
    "company":company,
}
jest.useRealTimers();

describe("Suit to register new user", () => {
    let driver;
    beforeAll(async () => {
        driver = await getBrowserDriver();
        await driver.get("http://automationpractice.com/index.php")
    })

    test("If result is 1 it's ok", async () => {
        jest.setTimeout(5 * 10000)
        const result = await registerHelper.createAccount(driver, email, user)
        expect(result).toEqual(1)
    }, 50000)

    afterAll(async () => {
        await driver.quit();
      });
})
