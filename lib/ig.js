const ig = require('instatouch');
const sID = process.env.sID;

const options = {
  // Number of posts to scrape: {int default: 0}
  count: 0,
  // Media type to scrape: ["image", "video", "all"]: {string default: 'all'}
  mediaType: 'all',
	timeout: 0,
  session: "sessionid="+sID
};

const IG = (url) => new Promise((resolve, reject) => {
    if (url === 'undefined') { reject('Masukkan URL nya.') }
	url = url.split('?')[0];
    try {
		ig.getPostMeta(url, options).then(data =>
            resolve({
				status: 200,
				url: data.graphql.shortcode_media.display_url
			})
		)
	} 
	catch(err){
		try {
			ig.getPostMeta(url, options).then(data =>
				resolve({
					status: 200,
					url: data.graphql.shortcode_media.display_url
				})
			)
		}
		catch(err) {
			reject({
				status:400,
				message:"Link Tidak Valid"
			})
		}
	}
})

module.exports = IG