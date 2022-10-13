export class PricingPage {
    navigate() {
        cy.visit('/pricing.html')
    }

    selectNumberOfRentals(value) {
        cy.get('#scroll-prop-plan').invoke('val', value).trigger('change')
    }

    verifyPlanPrice(plan, price) {
        cy.contains('.plan-name', plan)
            .siblings('.plan-price')
            .children('.total-sum')
            .should('have.text', price)
    }

    verifyCurrencyPricingOptions() {
        const currencies = ['$ USD', '€ EUR', '£ GBP']
        let prices = []

        cy.contains('Do you want to see other currencies?').should('be.visible')
        cy.get('.total-sum:visible').each(($price) => {
            prices.push(Number($price.text()))
        })
        currencies.forEach((currency) => {
            cy.get('.price-currency-select').select(currency)
            cy.get('.plan-price')
                .find('.currency-symbol:visible')
                .each(($sym) => {
                    expect($sym).to.have.text(currency.charAt(0))
                })
            cy.get('.total-sum:visible').each(($sum, index) => {
                expect(Number($sum.text())).to.be.lte(prices[index])
            })
        })
    }

    verifyMonthlyPrice() {
        cy.get('span:contains("Monthly"):visible')
            .should('not.have.descendants')
            .and('be.visible')
    }

    verifyYearlyPrice() {
        cy.get('span:contains("Yearly"):visible')
            .children()
            .should('contain.text', 'up to 30% off')
            .and('be.visible')
    }

    verifyTwoYearsPrice() {
        cy.get('span:contains("Two Years"):visible')
            .children()
            .should('contain.text', 'up to 35% off')
            .and('be.visible')
    }
}
