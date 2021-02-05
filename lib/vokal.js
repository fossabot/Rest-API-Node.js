const huruf = /[aiueo]/gi

const Vokal = (vokal, teks) => new Promise((resolve, reject) => {
    const hasil = teks.replace(huruf, `${vokal}`)
        resolve({
            status: 200,
            result: hasil
       })
})

module.exports = Vokal