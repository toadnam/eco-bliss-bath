describe('API - Orders', () => {
    const API_URL = 'http://localhost:8081';

    it('GET /orders sans authentification doit renvoyer une erreur de sécurité (403)', () => {
        cy.request({
            method: 'GET',
            url: `${API_URL}/orders`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('GET /orders avec authentification doit renvoyer 200', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/login`,
            body: {
                username: "test2@test.fr",
                password: "testtest"
            }
        }).then(loginResponse => {
            expect(loginResponse.status).to.eq(200);
            const token = loginResponse.body.token;

            cy.request({
                method: 'GET',
                url: `${API_URL}/orders`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('id');

                expect(response.body.validated).to.eq(false);

                expect(response.body).to.have.property('orderLines');
            });
        });
    });
}); 