describe('API - Products', () => {
    const API_URL = 'http://localhost:8081';

    it('GET /products/1 doit renvoyer 404 si le produit n\'existe pas', () => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/products/1`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('GET /products/3 doit renvoyer 200 et les infos du produit', () => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/products/3`,
        }).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('id', 3);
            expect(response.body).to.have.property('name');

            expect(response.body.name).to.contain('Sentiments');

            expect(response.body).to.have.property('availableStock');
        });
    });
}); 