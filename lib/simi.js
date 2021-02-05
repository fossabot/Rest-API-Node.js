const needle = require('needle')

const Simi = (teks) => new Promise((resolve, reject) => {
    needle(`https://simsumi.herokuapp.com/api?text=${teks}&lang=vi`, (err, resp, body) => {
        if (!err) {
            resolve(body)
        }
    })
})

module.exports = Simi