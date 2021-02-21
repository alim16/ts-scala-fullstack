import { cyan } from "@material-ui/core/colors"

describe('login scenarios', () =>{
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('login succeeds with CORRECT credentials', () => {
        // cy.get('.action-email')
        // .type('fake@email.com').should('have.value', 'fake@email.com')
    })
    it('login fails with INCORRECT credentials', () => {
        
    })
})