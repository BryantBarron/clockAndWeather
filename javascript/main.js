/*jshint esversion: 6 */
var myKey = config.key1;

getDate = () => {
  const dates = new Date();
  const day = dates.getDate();
  const hour = dates.getHours();
  const minutes = dates.getMinutes();
  const seconds = dates.getSeconds();
  const year = dates.getFullYear();
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayOfTheWeek = ["Sunday", "Monday","Tuesday","WednesDay","Thursday","Friday","Saturday"];

  if(hour >= 12) {
    var nonMilitaryTime = hour - 12;
    if(nonMilitaryTime < 10){
      console.log(nonMilitaryTime);
      document.querySelector('.d-hour').innerHTML = ("0" + nonMilitaryTime);
    }else{
      document.querySelector('.d-hour').innerHTML = nonMilitaryTime;
    }
  } else {
    document.querySelector('.d-hour').innerHTML = hour;
  }
  if(minutes < 10){
    document.querySelector('.d-minutes').innerHTML = ("0" + minutes);
  } else {
    document.querySelector('.d-minutes').innerHTML = minutes;
  }

  if(seconds < 10){
    document.querySelector('.d-seconds').innerHTML = ("0" + seconds);
  } else {
    document.querySelector('.d-seconds').innerHTML = seconds;
  }
  document.querySelector('#month').innerHTML = month[dates.getMonth()];
  document.querySelector('#day').innerHTML = day;
  document.querySelector('#year').innerHTML = year;
  document.querySelector('#dayOfWeek').innerHTML = dayOfTheWeek[dates.getDay()];
};

setInterval(getDate, 1000);

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureSummary = document.querySelector('.temp-summary');
  let temperatureDegree = document.querySelector('.temp-degree');
  let locationTimeZone = document.querySelector('.timeZone');
  let temperatureDescription = document.querySelector('.temp-description');
  const tempSpan = document.querySelector('.temp-description span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/${myKey}/${lat},${long}`;

      fetch(api).then(data =>{
        return data.json();
      }).then(data => {
        console.log(data);
        const {temperature, summary, icon} = data.currently;
        
        temperatureDegree.textContent = temperature;
        temperatureSummary.textContent = summary;
        locationTimeZone.textContent = data.timezone;

        //add icons
        setIcons(icon, document.querySelector('.icon'));

        //convert to Farenheit or Celcius
        let celsius = (temperature - 32) *  (5 /9);
        temperatureDescription.addEventListener('click', () => {
          if(tempSpan.textContent === "F"){
            tempSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
          }else{
            tempSpan.textContent = "F";
            console.log(temperature);
            temperatureDegree.textContent = temperature;
          }
        })
      });
    });
  }else{
    console.log("This doesnt work");
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "#4371f1"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
