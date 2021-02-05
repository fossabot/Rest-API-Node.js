const fbdl = require("fbdl-core");

const FB = (url) => new Promise((resolve, reject) => {
	if(!url || url == undefined) return reject("Masukkan URL nya");
	fbdl.getInfo(url)
	.then(res => {
		resolve({
			title: res.title,
			deskripsi: res.description,
			thumbnail: res.thumbnail,
			durasi: res.duration,
			hd: res.streamURL,
			sd: res.rawVideo
		});
	}).catch(err => reject(err));
})

module.exports = FB