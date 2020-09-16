
import 'unfetch/polyfill';

const fetchForeCasts = cityCode => 
  fetch(`https://ws.weatherzone.com.au/?lt=aploc&lc=${cityCode}&locdet=1&latlon=1&pdf=twc(period=48,detail=2)&u=1&format=json`)
    .then( r => r.json());

export default fetchForeCasts;