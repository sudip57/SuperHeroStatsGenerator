const SUPERHERO_TOKEN = "3331277887191319";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const reloadBtn = document.getElementById("btn");
const heroImage = document.getElementById("heroImg");
const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchInput");

let randomNum = () => {
  let randomHeroNumber = 731;
  return Math.floor(Math.random() * randomHeroNumber) + 1;
};

// function for random superhero
const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      showHeroInfo(json);
    });
};

// function for search
const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      heroImage.innerHTML = `<br><img src="${hero.image.url}" height=200 width=200>`;
      showHeroInfo(hero);
    });
};

// emoji function
const stattoEmoji = {
  intelligence: "🧠",
  strength: "💪",
  power: "📊",
  speed: "⚡️",
  durability: "👨‍🏭",
  combat: "⚔️",
};

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`;
  const img = `<br><img src="${character.image.url}" height=200 width=200>`;

  // Object.keys(value)=> changes object into array
  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p><br>${stattoEmoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</p>`;
      // .join('') converts array to string
    })
    .join("");
  heroImage.innerHTML = `${name}${img}${stats}`;
};

// buttons
reloadBtn.onclick = () => getSuperHero(randomNum());
searchBtn.onclick = () => getSearchSuperHero(searchInput.value);
