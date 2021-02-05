const request = require('request');
const APIKey = process.env.WeatherKey;
const units = 'metric';

const Cuaca = (kota) => {
  return new Promise((resolve, reject) => {
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=${units}&appid=${APIKey}`;
	request(url, function (err, response, body) {
		if (err) {
			reject(err);
		} else {
			const cuaca = JSON.parse(body);
			var pesan = {
				status: response.statusCode,
				data: {
					Nama: cuaca.name+','+cuaca.sys.country,
					Longitude : cuaca.coord.lon,
					Latitude: cuaca.coord.lat,
					Suhu: cuaca.main.temp+" C",
					Angin: cuaca.wind.speed+" m/s",
					Kelembaban: cuaca.main.humidity+"%",
					Cuaca: cuaca.weather[0].main,
					Keterangan: cuaca.weather[0].description,
					Udara: cuaca.main.pressure+" HPa"
				},
			}
			resolve(pesan);
		}
	});
  })
}

module.exports = Cuaca;