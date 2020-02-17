let planets = [];
let people = [];

const planetsElement = document.querySelector('#planets');
const peopleElement = document.querySelector('#people');

console.log(planetsElement)


getPlanets()
    .then(data => {
        console.log("mame data")
        planets = data;
        console.table(planets);
        showPlanets2();
        // z prvni planety ziskej lidi
        getPeople(planets[0].people);
}).catch(error => console.log('doslo k chybe', error))

console.log("konec")


function showPlanets() {
    let html = '';
    planets.forEach(planet => {
        //backtick muze byt na vic radku
        //toto se da zapsat i pres creator, kterym si vytvorim vsechny ty prvky neco typu creator.createDiv a tomu addClass
        //riziko je, ze kdybych mela nejaky vstup od uzivatele, tak by mi sem mohl zapsat skodlivy kod
        html += `
        <div class="planet">
        <div class="planet__name">${planet.name}</div>
        <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
      </div>
        `;
    });

    

    //timto vlozim prvek na tu stranku
    planetsElement.innerHTML = html;
}

function showPlanets2() {
    let html = '';
    

    //2 parametry povinne, prvni parametr je fce a druhy je vychozi hodnota, 
    //do total se postupne uklada mezivysledek
    html = planets.reduce((total, planet) => {
        return total += `
        <div class="planet">
        <div class="planet__name">${planet.name}</div>
        <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
      </div>

        `


    }, '')

    //timto vlozim prvek na tu stranku
    planetsElement.innerHTML = html;
}

getPerson('https://swapi.co/api/people/5/').then(person => console.log(person));




//vrati mi promise pro jednoho konkretniho cloveka

async function getPerson(url){
    let response = await fetch(url);
    let data = await response.json();

    return {
        name: data.name,
        gender: data.gender,
        height: data.height,
        hair: data.hair_color,
        eyes: data.eye_color
    }

}


//na vstupu budu mit pole odkazu api (zase viz api, tak to tam je)
/*
async function getPeople(persons) {
    
    //tady dostanu pole slibu
    let personPromises = persons.map(person => {
        return fetch(person);
        //tady neni await, protoze promise se vrati hned a ja dal pracuju s promise a nechci zbytecne cekat na splneni promise
    })

    Promise.all(personPromises)
    //tady je pole odpovedi z toho promises
    .then(responses)

}*/


async function getPeople(persons) {
    
    //tady dostanu pole slibu
    let personPromises = persons.map(person => {
        //z tohoto se mi
        return getPerson(person);
        //tady neni await, protoze promise se vrati hned a ja dal pracuju s promise a nechci zbytecne cekat na splneni promise
    })


    //tady uz mame pole tech lidi, jelikoz to je vysledek fce getPeople
    Promise.all(personPromises)
    .then(responses => {
        people = responses;
        showPeople();
    });

}

function showPeople() {
    let html = '';
    people.forEach(person => {
        //backtick muze byt na vic radku
        //toto se da zapsat i pres creator, kterym si vytvorim vsechny ty prvky neco typu creator.createDiv a tomu addClass
        //riziko je, ze kdybych mela nejaky vstup od uzivatele, tak by mi sem mohl zapsat skodlivy kod
        html += `
        <div class="person">
    <div class="person__icon"><i class="fas fa-robot"></i></div>
        <h2 class="person__name">${person.name}</h2>
        <p class="person__info">
          Hair: ${person.hair}<br>
          Eyes: ${person.eyes}<br>
          Height: ${person.height} cm
        </p>
    </div>
        `;
    });

    

    //timto vlozim prvek na tu stranku
    peopleElement.innerHTML = html;

}


//async vrací promise

async function getPlanets(){
    
    let response  = await fetch('https://swapi.co/api/planets/');
    let data = await response.json();



    //toto mi vraci pole a pole ma fci map, ktera mi neco premapuje

    return data.results.map(planet => {
        return {
            //name si zase zjistim z toho api
            name: planet.name,
            dayLenght: planet.rotation_period,
            yearLenght: planet.orbital_period,
            people: planet.residents    
        }
    })

    //toto mi vratai pole planet, to vidim v tech datech, jak to vypada
    //return ;
    //return data.count;

    //.then(response => response.json())
    //.then(data => console.log(data));

    //console.log("konec")
}


//'`
