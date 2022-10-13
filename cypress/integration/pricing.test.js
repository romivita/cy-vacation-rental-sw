import { PricingPage } from '../page-objects/pricing-page'

context('Lodgify pricing page', () => {
    const pricingPage = new PricingPage()

    before(() => {
        pricingPage.navigate()
    })

    describe('Yearly plan selecting 50 rentals', () => {
        before(() => {
            pricingPage.selectNumberOfRentals('50')
        })
        it('Should display $64 for Starter plan', () => {
            pricingPage.verifyPlanPrice('Starter', '64')
        })
        it('Should display $375 for Professional plan', () => {
            pricingPage.verifyPlanPrice('Professional', '375')
        })
        it('Should display $525 for Ultimate plan', () => {
            pricingPage.verifyPlanPrice('Ultimate', '525')
        })
    })

    describe('Change of currency', () => {
        it('Should change the currency of the pricing options', () => {
            pricingPage.verifyCurrencyPricingOptions()
        })
    })

    describe('Price period', () => {
        it('Should display Monthly plan', () => {
            pricingPage.verifyMonthlyPrice()
        })
        it('Should display Yearly plan up to 30% off', () => {
            pricingPage.verifyYearlyPrice()
        })
        it('Should display Two Years plan up to 35% off', () => {
            pricingPage.verifyTwoYearsPrice()
        })
    })
})
