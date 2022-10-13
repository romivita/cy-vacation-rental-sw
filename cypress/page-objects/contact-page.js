export class ContactPage {
    navigate() {
        cy.visit('/contact.html')
    }

    send() {
        cy.get('form').submit()
    }

    verifyFieldValidations() {
        const requiredFields = ['Name', 'Phone', 'Email', 'Comment']
        requiredFields.forEach((field) => {
            cy.contains('.error', field + ' is mandatory').should('be.visible')
        })
    }

    openDayPicker() {
        cy.get('[placeholder="Arrival"]').click()
        for (let i = 0; i < 3; i++) {
            cy.get('.DayPickerNavigation_button').last().click()
        }
    }

    setDay(day, month) {
        for (let i = 0; i < 2; i++) {
            cy.get('.DayPickerNavigation_button').last().click()
        }
        cy.contains('.CalendarMonth_caption', month)
            .next('.CalendarMonth_table:visible')
            .within(() => {
                cy.contains(day).click()
            })
    }

    verifyArrivalDate(date) {
        cy.get('[placeholder="Arrival"]').invoke('val').should('eq', date)
    }

    verifyDepartureDate(date) {
        cy.get('[placeholder="Departure"]').invoke('val').should('eq', date)
    }

    typeComment(comment) {
        cy.get('[placeholder="Comment"]').type(comment).blur()
    }

    verifyComment(comment) {
        cy.get('[placeholder="Comment"]').should('have.text', comment)
    }
}
