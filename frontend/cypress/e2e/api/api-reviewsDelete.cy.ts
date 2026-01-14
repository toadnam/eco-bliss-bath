describe('API - Delete review', () => {
    const API_URL = 'http://localhost:8081';
    const USERNAME = 'test2@test.fr';
    const PASSWORD = 'testtest';
    const REVIEW_ID = 10;

    it('DELETE /reviews/{id} - doit renvoyer 200/204/404 et laisser l’API dans un état stable', () => {
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
                method: 'DELETE',
                url: `${API_URL}/reviews/${REVIEW_ID}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                failOnStatusCode: false,
            }).then((deleteResponse) => {
                expect([200, 204, 404]).to.include(deleteResponse.status);

                cy.request({
                    method: 'GET',
                    url: `${API_URL}/reviews`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((getResponse) => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.body).to.be.an('array');
                });
            });
        });

    });
});