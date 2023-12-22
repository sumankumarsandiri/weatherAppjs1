const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchInput");
const form = document.querySelector("form");

let target = "india";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key= 675eb3aa63fd434f95571203232112 &q=${target}
  `;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not fond");
  }
};
function updateDom(temperature, city, time, emoji, text) {
  temperateField.innerText = temperature;
  cityField.innerText = city;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = new Date(exactDate).getDay();
  //   or
  //   const exactDay =getDayFullName(new Date(exactDate).getDay()) ;
  //   console.log(exactDay);

  //   console.log(exactTime);
  //   console.log(exactDate);
  dateField.innerText = `${exactTime}-${getDayFullName(exactDay)} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thrusday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";

    default:
      return "Don't Know!";
  }
}

const search = (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
  //   console.log(target);
};

form.addEventListener("submit", search);
