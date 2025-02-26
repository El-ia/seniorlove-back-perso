describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/accueil') // change URL to match your dev URL
    cy.contains('SeniorLove')
  })
  it('passes', () => {
    cy.visit('http://localhost:5173/connexion')
    //cy.contains('Se connecter') 
    cy.wait(3000)
    cy.get('form').first().within(($form) => {
      cy.get('input[name="email"]').type('claude65@example.com')
      cy.get('input[name="password"]').type('Cl@ude1958!')
      cy.root().submit()
    })
  })
})