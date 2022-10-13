import { ContactPage } from '../page-objects/contact-page'
import faker from 'faker'

context('Lodgify contact page', () => {
    const contactPage = new ContactPage()

    beforeEach(() => {
        contactPage.navigate()
    })

    it('Should appear an error when the field is mandatory and is sent empty.', () => {
        contactPage.send()
        contactPage.verifyFieldValidations()
    })

    it('Should be able to select the arrival date and departure date from the datepicker', () => {
        contactPage.openDayPicker()
        contactPage.setDay('14', 'April 2023')
        contactPage.setDay('14', 'June 2023')
        contactPage.verifyArrivalDate('14/04/2023')
        contactPage.verifyDepartureDate('14/06/2023')
    })

    it('Should be able to add a comment', () => {
        const comment = faker.lorem.words(3)
        contactPage.typeComment(comment)
        contactPage.verifyComment(comment)
    })
})
