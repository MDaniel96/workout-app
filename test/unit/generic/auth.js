var expect = require('chai').expect;
var authMW = require('../../../middlewares/generic/auth');

describe('authMW', () => {
    it('should call next if userid in session exists', (done) => {
        var reqMock = {
            session: {
                userid: 'pista'
            }
        };

        authMW({})(reqMock, {}, () => {
            done();
        });
    });
    it('should call res.redirect if userid in session not exists', (done) => {       
        var reqMock = {
            session: {}
        };
        var resMock = {
            redirect: (newUrl) => {
                expect(newUrl).be.eql('/');
                done();
            }
        };

        authMW({})(reqMock, resMock, () => {
            expect('next sould not be called').be.eql(false);
        });
    });
});
