/// <reference types="cypress" />

const el = {
  homePage: ()=> cy.get('#home-page'),
  buildPage: ()=> cy.get('#build-page'),
  cartPage: ()=> cy.get('#cart-page'),
  homeOrderButton: ()=> cy.get('#order'),
  menu: {
    home: ()=> cy.get("#nav-menu #home-menu"),
    cart: ()=> cy.get("#nav-menu #cart-menu"),
    build: ()=> cy.get("#nav-menu #build-menu"),
    translate: ()=> cy.get("#nav-menu #flag"),
  },
  cartItem: ()=> cy.get("#cart-page .cart-item"),
  partSelector: {
    top: ()=> cy.get(".top .next-selector"),
    bottom: ()=> cy.get(".bottom .next-selector"),
    left: ()=> cy.get(".left .prev-selector"),
    right: ()=> cy.get(".right .next-selector"),
    center: ()=> cy.get(".center .prev-selector"),
  },
  addBot: ()=> cy.get("#add-cart"),
  removeCartItem: ()=> cy.get(".remove-cart-item"),
}


describe('Home page tests', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('Check if home page exists', () => {    
    el.homePage().should('exist')
  })

  it('Check if Order Button is Ok', () => {       
    el.homeOrderButton().should('exist')   
    el.homeOrderButton().click()
    el.buildPage().should('exist')
  })
})


describe('Translate tests', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('Check if translation feature is Ok', () => {    
    el.menu.home().should('exist')
    el.menu.translate().should('exist')

    el.menu.home().should('contain.text', 'Home')
    el.menu.translate().click()
    el.menu.home().should('contain.text', 'Início')
  })

})



describe('Menu tests', () => {
  beforeEach(()=>{
    cy.visit('/')
    el.homePage().should('exist')
  })

  it('Check if Cart Menu is Ok', () => {
    el.menu.cart().click()
    el.cartPage().should('exist')
  })

  it('Check if Build Menu is Ok', () => { 
    el.menu.build().click()
    el.buildPage().should('exist')
  })

  it('Check if Home Menu is Ok', () => {    
    el.menu.home().click()
    el.homePage().should('exist')
  })
})

describe('Building bots tests', () => {
  beforeEach(()=>{
    cy.visit('/cart')
    el.cartPage().should('exist') 
  }) 

 it('Check if a bot is created', () => {   
    // checa se não há nada no carrinho
    el.cartItem().should('not.exist')
    
    // vai para tela de build
    el.menu.build().click()
    el.buildPage().should('exist')

    // seleciona o robô desejado:
    el.partSelector.top().click();

    el.partSelector.bottom().click();
    el.partSelector.bottom().click();

    el.partSelector.left().click();
    el.partSelector.left().click();

    el.partSelector.right().click();
    
    el.partSelector.center().click();
    el.partSelector.center().click();
    el.partSelector.center().click();

    // adiciona no carrinho
    el.addBot().click();

    // volta para o carrinho
    cy.visit('/cart')
    el.cartPage().should('exist') 

    // checa se o robô foi adicionado no carrinho
    el.cartItem().should('exist')

    // clica no remover
    el.removeCartItem().click()

     // checa se o robô foi removido do carrinho
    el.cartItem().should('not.exist')

 })

})


