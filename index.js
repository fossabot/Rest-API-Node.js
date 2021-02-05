const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const ytdl = require('ytdl-core')
const {
	IGStalk,
	KBBI,
	Lirik,
	Cuaca,
	IG,
	FB,
	IpLookup,
	Tiktok,
  Vokal,
  Headers,
  Covid,
  Simi,
  Github,
  Shortlink,
  WPUser
} = require('./lib')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.set('json spaces', 4)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.get("/", async function (req, res) {
  res.redirect('https://www.apimau.ga')
})

app.get('/igs', (req, res) => {
	var url = req.query.u || req.query.username
	if(!url || url == undefined)
		return res.status(200)
		.send({
			code:200,
			message:"Masukkan parameter username atau u"
		})
	IGStalk(url)
	.then(data => {
		res.send(data)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/kbbi', (req, res) => {
	const kata = req.query.text || req.query.kata
	if(!kata || kata == undefined)
	  return res.status(200)
		.send({
			code: 200,
			message: 'Masukkan Parameter kata atau text.'
			})
	KBBI(kata)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
})

app.get('/lirik', (req, res) => {
	const l = req.query.l || req.query.lagu || req.query.musik
	if(!l || l == undefined)
	  return res.status(200)
		.send({
        code: 200,
        message: 'Tolong masukkan parameter lagu atau musik'
      })
	Lirik(l)
			.then(data => {
				res.send(data)
			})
			.catch(err  => {
				res.send(err)
			})
})

app.get('/ytmp3', (req, res) => {
	var id = req.query.url || req.query.link
	if(!id || id == undefined) 
        return res.send(
		{
			code:400,
			message:'Masukkan ID Atau Link Video'
		});
  if(id.includes("youtube")){
		urls = id
		var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
    	r = urls.match(rx)
		id = r[1]
  }
	res.header('Content-Disposition', `attachment; filename="audio.mp3"`)
	ytdl(id, {
      format: 'mp3',
      filter: 'audioonly'
     }).pipe(res)
})

app.get('/ytmp4', (req, res) => {
	var id = req.query.url || req.query.link
	if(!id || id == undefined) 
        return res.send(
		{
			code:400,
			message:'Masukkan ID Atau Link Video'
		});
  if(id.includes("youtube")){
		urls = id
		var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
    	r = urls.match(rx)
		id = r[1]
  }
	res.header('Content-Disposition', `attachment; filename="video.mp4"`)
	ytdl(id, {
      format: 'mp4',
     }).pipe(res)
})

app.get('/cuaca', (req, res) => {
	var lokasi = req.query.kota
	if(!lokasi || lokasi == undefined)
		return res.send({
			code:400,
			message:"Kota Tidak Di Temukan"
		})
	Cuaca(lokasi)
			.then(data => {
				res.send(data)
			})
			.catch(err => {
				res.send(err)
			})
})

app.get('/ig', (req, res) => {
	var url = req.query.url || req.query.link
	if(!url || url == undefined)
		return res.status(200)
		.send({
			code:200,
			message:"Masukkan parameter url atau link"
		})
	IG(url)
	.then(data => {
		res.send(data)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/fb', (req,res) => {
	var url = req.query.url || req.query.link
	if(!url || url == undefined)
		return res.status(200)
		.send({
			code:400,
			message:"Masukkan parameter url atau link"
		})
	FB(url)
	.then(data => {
		res.send(data)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/iplookup', (req, res) => {
    const ip = req.query.ip
    if (!ip) {
      res.status(200)
			.send({
        code: 200,
        message: 'Masukkan parameter ip.'
      })
    } else {
      IpLookup(ip)
      	.then(data => {
          res.send(data)
        }).catch(err => {
          res.send(err)
        })
    }
})

app.get('/tiktok', (req, res) => {
	const url = req.query.url || req.query.link
	if(!url || url == undefined)
	return res.send({
        code: 400,
        message: 'Masukkan parameter url atau link.'
    })
	Tiktok(url)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
})

app.get('/vokal', (req, res) => {
    const vokal = req.query.vokal
    const teks = req.query.teks
    if (!vokal && !teks) {
      res.send({
        status: 400,
        message: 'Masukkan parameter vokal dan teks.'
      })
    } else {
      Vokal(vokal, teks)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.send(err)
        })
    }
})

app.get('/http-headers', (req, res) => {
    const url = req.query.url || req.query.link
    if (!url) {
      res.status(400).send({
        status: 400,
        message: 'Masukkan parameter url atau link.'
      })
    } else {
      Headers(url)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.send(err)
        })
    }
})

app.get('/covid', (req, res) => {
	var la = req.query.la;
	var lo = req.query.lo;
	if( !la || !lo || la == undefined || lo == undefined)
		return res.status(400)
    .send({
			status:400,
			message:"Masukkan parameter la dan lo"
		})
	Covid(la, lo)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.send(err);
		})
})

app.get('/simi', (req, res) => {
    const teks = req.query.teks || req.query.text
    if (!teks) {
      res.status(400)
      .send({
        status: 400,
        message: 'Masukkan parameter teks atau text.'
      })
    } else {
      Simi(teks)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.send(err)
        })
    }
})

app.get('/github', (req, res) => {
    const user = req.query.user || req.query.u
    if (!user) {
      res.status(200)
			.send({
        code: 200,
        message: 'Masukkan parameter user.'
      })
    } else {
      Github(user)
      	.then(data => {
          res.send(data)
        }).catch(err => {
          res.send(err)
        })
    }
})

app.get('/shortlink', (req, res) => {
	const url = req.query.url || req.query.link;
	if(!url || url == undefined)
	return res.send({
        code: 400,
        message: 'Masukkan parameter url atau link.'
	})
	Shortlink(url)
			.then(ress => {
				res.send(ress)
			})
			.catch(err => {
				res.send(err)
			})
})

app.get('/wpusers', (req, res) => {
	var url = req.query.link || req.query.url
	if(!url || url == undefined)
		return res.status(200)
		.send({
			code:200,
			message:"Masukkan parameter url"
		})
	WPUser(url)
	.then(data => {
		res.send(data)
	}).catch(err => {
		res.send(err)
	})
})

app.get('*', function(req, res){
    res.redirect('https://www.apimau.ga')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})