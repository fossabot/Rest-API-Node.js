const Genius = require("genius-lyrics")
const Client = new Genius.Client(process.env.gToken)

async function cari(musik) {
        const searches = await Client.songs.search(musik).catch(err => {return err});

        const firstSong = searches[0];

        const lyrics = await firstSong.lyrics()+"\n";
        return lyrics;
}

const Lirik = (musik) => new Promise((resolve, reject) => {
    if (!musik) { reject('Lirik Lagu Tidak Di Temukan.') }
    cari(musik)
    .then(data => {
		resolve({
			data
		})
	})
})

module.exports = Lirik;
