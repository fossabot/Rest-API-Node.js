const needle = require('needle')

const Headers = (url) => new Promise((resolve, reject) => {
    if (!url) { reject('Masukkan URL nya') }

    needle(url, (error, resp, body) => {
        resolve({
          status: resp.statusCode,
          result: resp.headers
        })
    })
})

module.exports = Headers