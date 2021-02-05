const scrapy = require('node-scrapy')
const fetch = require("node-fetch");
const url = 'https://kbbi.kemdikbud.go.id/entri/';
const KBBI = (kata) => new Promise((resolve, reject) => {
	try{
		var  model = {
			ejaan: 'h2',
			arti: ['ol li', 'ul.adjusted-par']
		}
    var kata2 = kata;
		fetch(url +kata)
			.then((res) => res.text())
			.then((body) => {
				var log = scrapy.extract(body, model)
				if(log.arti == null){
					model = {
            ejaan: 'h2',
						arti: ['ul.adjusted-par']
					}
					fetch(url + kata2)
						.then((res) => res.text())
						.then((body) => {
							log = scrapy.extract(body, model)
							if(log.arti != null)
								{
                  var kata3 = log.arti.map(s => s.slice(1).split("  ").join(""));
                  resolve({
                    ejaan: log.ejaan,
                    arti: kata3
                  })
                }
							else{reject("Arti Tidak Di Temukan");}
						})
				}
				else
        {
          var kata =  log.arti.map(s => s.slice(1).split("  ").join(""));
          resolve({
            ejaan: log.ejaan,
            arti: kata
          })
        }
			})
	} catch(err){
		reject(err)
	}
})

module.exports = KBBI;