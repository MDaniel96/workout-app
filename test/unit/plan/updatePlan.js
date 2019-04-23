var expect = require('chai').expect;
var updatePlanMW = require('../../../middlewares/plan/updatePlan');

describe('updatePlanMW', () => {
    it('should call next if req.body.title is undefined', (done) => {
        var reqMock = {
            body: {}
        };

        updatePlanMW({ planModel: true })(reqMock, {}, () => {
            done();
        });
    });
    it('should call next if req.body.description is undefined', (done) => {
        var reqMock = {
            body: {
                title: 'pista'
            }
        };

        updatePlanMW({ planModel: true })(reqMock, {}, () => {
            done();
        });
    });
    it('should call redirect after save', (done) => {
        var reqMock = {
            body: {
                title: 'pista',
                description: 'pista2',
                difficulty: 4,
                length: 140
            },
            session: {
                userid: '123123'
            }
        };
        var planMock = {
            title: 'oldtitle',
            description: 'olddescript',
            difficulty: 3,
            length: 120,
            save: (cb) => {
                cb(undefined, {
                    id: '1234'
                })
            }
        };
        var resMock = {
            tpl: {
                plan: planMock
            },
            redirect: (newUrl) => {
                expect(resMock.tpl.plan.title).be.eql('pista');
                expect(resMock.tpl.plan.description).be.eql('pista2');
                expect(resMock.tpl.plan.difficulty).be.eql(4);
                expect(resMock.tpl.plan.length).be.eql(140);
                expect(resMock.tpl.plan._user).be.eql('123123');

                expect(newUrl).be.equal('/plan/user');
                done();
            }
        }

        updatePlanMW({ planModel: true })(reqMock, resMock, () => {
            expect('next should not be called').be.eql(false);
        });
    });
    it('should call next with error if save was not ok', (done) => {
        var reqMock = {
            body: {
                title: 'pista',
                description: 'pista2',
                difficulty: 4,
                length: 140
            },
            session: {
                userid: '123123'
            }
        };
        var planMock = {
            title: 'oldtitle',
            description: 'olddescript',
            difficulty: 3,
            length: 120,
            save: (cb) => {
                cb('hiba');
            }
        };
        var resMock = {
            tpl: {
                plan: planMock
            }
        }

        updatePlanMW({ planModel: true })(reqMock, resMock, (err) => {
            expect(err).be.eql('hiba');
            done();
        });
    });
    it('should create plan if res.tpl.plan is undefined and save', (done) => {
        var reqMock = {
            body: {
                title: 'pista',
                description: 'pista2',
                difficulty: 4,
                length: 140
            },
            session: {
                userid: '123123'
            }
        };

        var planModelMock = function() {};
        planModelMock.prototype.save = function(cb) {
            expect(this.title).be.eql('pista');
            expect(this.description).be.eql('pista2');
            expect(this.difficulty).be.eql(4);
            expect(this.length).be.eql(140);
            expect(this._user).be.eql('123123');

            cb(undefined, {
                id: '1234'
            });
        };

        var resMock = {
            tpl: {},
            redirect: (newUrl) => {
                expect(newUrl).be.equal('/plan/user');
                done();
            }
        }

        updatePlanMW({ planModel: planModelMock })(reqMock, resMock, () => {
            expect('next should not be called').be.eql(false);
        });
    });
});
