describe('API - Reviews', () => {
    const API_URL = 'http://localhost:8081';
    const USERNAME = 'test2@test.fr';
    const PASSWORD = 'testtest';

    it('POST /reviews sans authentification doit renvoyer 401', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/reviews`,
            failOnStatusCode: false,
            body: {
                product: 3,
                rating: 4,
                comment: "Très bon produit",
            },
        }).then((response) => {
            expect(response.status).to.eq(401);

            expect(response.body).to.have.property('code', 401);
            expect(response.body).to.have.property('message', 'JWT Token not found');
        });
    });

    it('POST /reviews avec token valide mais payload incorrect doit renvoyer une erreur 400', () => {
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
                method: 'POST',
                url: `${API_URL}/reviews`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                failOnStatusCode: false,
                body: {
                    product: 3,
                    rating: 4,
                    comment: "Bon produit, test API.",
                },
            }).then((response) => {
                expect(response.body).to.have.property('error');
                expect(response.body.error).to.be.an('array');
                expect(response.body.error.length).to.be.greaterThan(0);

                const firstError = response.body.error[0];
                expect(firstError).to.have.property(
                    'message',
                    'This form should not contain extra fields.'
                );

                if (firstError.messageParameters) {
                    expect(firstError.messageParameters['{{ extra_fields }}']).to.contain('product');
                }
            });
        });
    });


});