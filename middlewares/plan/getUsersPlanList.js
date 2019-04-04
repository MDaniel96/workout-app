var requireOption = require('../common').requireOption;

/**
 * Get user's plan list
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var plans = [
            {
                id: 1,
                title: 'Bico',
                creator: 'Userrr',
                description: 'asdfasdfasdfasdfasf',
                length: 45,
                difficulty: 5,
                comments: [
                    {
                        name: 'Kathi Béla',
                        content: 'Nem vagyok bziii'
                    },
                    {
                        name: 'Gyuros gyerek',
                        content: 'de az vagy xdd ikszdé'
                    }
                ]
            },
            {
                id: 2,
                title: 'Trico',
                creator: 'Userrr',
                description: 'twertwertwertwertewrt',
                length: 25,
                difficulty: 1,
                comments: [
                    {
                        name: 'anonim',
                        content: 'lol'
                    }
                ]
            },
            {
                id: 3,
                title: 'Lab',
                creator: 'Userrr',
                description: 'Labnap nincs',
                length: 12,
                difficulty: 3,
                comments: [
                    {
                        name: 'Sandor',
                        content: 'kell a lábnap ember!'
                    },
                    {
                        name: 'Gyuros gyerek',
                        content: 'te vagy a lábnap'
                    }
                ]
            }
        ];

        res.tpl.plans = plans;

        return next();
    };

};