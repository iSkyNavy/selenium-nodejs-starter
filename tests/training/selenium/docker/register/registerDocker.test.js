const getBrowserDriver = require("../../../../../src/browsers/browserDriver");
const registerHelper = require ("../../../../../src/helpers/ecommerce-docker/register/register.helpers")

const  firstname = process.env.firstname
const  lastname = process.env.lastname
const  email = process.env.email
const URL_BASE = process.env.url_base

const user = {
    "firstname":firstname,
    "lastname":lastname,
    "email":email
}
jest.useRealTimers();

describe(`Suit to register new user ${email}`, () => {
    let driver;
    beforeAll(async () => {
        driver = await getBrowserDriver();
        await driver.get(URL_BASE)
    })

    test(`Sr ${firstname} If result is Success it's ok`, async () => {
        jest.setTimeout(5 * 1000)
        const result = await registerHelper.createAccount(driver, user)
        expect(result).toMatch(/^(Success)+/);

    })
    afterAll(async () => {
        await driver.quit();
      });
})
