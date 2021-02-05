const needle = require('needle')

const WPUser = (site) => new Promise((resolve, reject) => {
    const name = []
    const description =[]
    const link = []
    const user = []
    const url = site+'/wp-json/wp/v2/users/'
    needle(url, (err, resp, body) => {
        if (!err) {
            for (let i = 0; i < body.length; i++) {
                name.push(body[i]['name']),
                description.push(body[i]['description']),
                link.push(body[i]['link']),
                user.push(body[i]['slug'])
            }
            resolve({
                code: resp.statusCode,
                message: 'success',
                url: site,
                name: name,
                deskripsi: description,
                link: link,
                user: user
            })
        }
    })
})

WPUser(process.argv[2])
.then(data => console.log(data))
.catch(err => console.log(err))

module.exports = WPUser