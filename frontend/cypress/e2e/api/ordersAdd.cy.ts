describe('API - Orders add', () => {
    const API_URL = 'http://localhost:8081';
    const USERNAME = 'test2@test.fr';
    const PASSWORD = 'testtest';

    it('PUT /orders/add - produit disponible => doit ajouter une ligne de commande', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/login`,
            body: {
                username: USERNAME,
                password: PASSWORD,
            },
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
            const token = loginResponse.body.token;

            cy.request({
                method: 'PUT',
                url: `${API_URL}/orders/add`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    product: 3,
                    quantity: 1,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('id');
                expect(response.body.validated).to.eq(false);

                expect(response.body).to.have.property('orderLines');
                expect(response.body.orderLines).to.be.an('array');
                expect(response.body.orderLines.length).to.be.greaterThan(0);
            });
        });
    });

    it('PUT /orders/add - quantité > stock => doit renvoyer une erreur fonctionnelle (test volontairement FAIL)', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/login`,
            body: {
                username: USERNAME,
                password: PASSWORD,
            },
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
            const token = loginResponse.body.token;

            cy.request({
                method: 'PUT',
                url: `${API_URL}/orders/add`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    product: 3,
                    quantity: 999,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect([400, 422]).to.include(response.status);
            });
        });
    });
});