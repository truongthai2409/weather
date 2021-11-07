const APP_ID = 'c3376dd760621c6c4b8360fb91a29c5b';
const DEFAULT_VALUE = "--";

const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const wheatherState = document.querySelector('.wheather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperrature = document.querySelector('.temperrature');



const sunRise = document.querySelector('.sunRise');
const sunSet = document.querySelector('.sunSet');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');

searchInput.addEventListener('change',(e) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res =>{
            const data = await res.json();
            console.log('[searchInput]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            wheatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperrature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

            sunRise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunSet.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;

        }); 
});

// ============= Trợ lý ảo ===============
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'vi-VI';
// recognition.lang = 'en-US';
recognition.continuous = false;

const microphone = document.querySelector('.mic');
const handleVoice  = (text) =>{
    console.log('text',text);
    const handledText = text.toLowerCase();
    if (handledText.includes('thời tiết tại')) {
        const location = handledText.split('tại')[1].trim();
        console.log('location',location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
    }
    
}

microphone.addEventListener('click', (e) =>{
    e.preventDefault();
    
    recognition.start();
    alert("Vui lòng nói 'thời tiết tại' + Thành phố mà bạn muốn!");
    microphone.classList.add('recoding');
});

recognition.onspeeched =()=>{
    recognition.stop();
    microphone.classList.remove('recoding');
}

recognition.onerrorr = (err) =>{
    console.log(err);
    microphone.classList.remove('recoding');
}

recognition.onresult = (e) =>{
    console.log('onresult',e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}
