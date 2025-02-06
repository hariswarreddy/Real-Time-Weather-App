// Initialising All The Elements From index.html
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding Event Listener To The Form
form.addEventListener("submit", search);

// Default Location
let target = "new delhi";

// Functiona To Fetch Data From Weather API
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=0cc818d2073544408f9210001250602&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        // Destructuring
        const {
            current: { temp_c, condition: { text, icon } },
            location: { name, localtime }
        } = data;

        // Calling Update DOM Function
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location Not Found. \nPlease Try Again!!");
    }
}

//  Function To Upadte The DOM
function updateDom(temperature, city, date, emoji, weather) {
    const exactTime = date.split(" ")[1];
    const exactDate = date.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperatureField.innerText = temperature + "°";
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = weather;
}
fetchData(target);

// Function To Search The Input Location
function search(e){
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
}

// Function To Get Name Of Day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return "Invalid";
            break;
    }
}