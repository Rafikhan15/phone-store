const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;

    if (inputValue == "" || isNaN(inputValue) != true) { //isNaN check number or string /others


        error.innerText = "please give a phone name in world";
        // clear input data
        input.value = "";
        // clear input data before the search
        main.innerHTML = "";


    }

    else {
        // clear main context data before the search
        main.innerHTML = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => cardsDisplay(data.data));
        // .then(data => console.log(data));
        // clear input data
        input.value = "";
        // clear error context data before the search
        error.innerHTML = "";
    }
}

const cardsDisplay = (cards) => {
    // // cards = data.data;
    // console.log(cards);
    for (const card of cards) {
        // console.log(card);
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("mb-5");

        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.phone_name}</h5>
                    <p class="card-text">brand: ${card.brand}</p>
                    <button onclick="loadPhoneDetail('${card.slug}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
        `
        main.appendChild(div);
    }
}


const loadPhoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        // .then(data => displayPhoneDetail(data.data));
        .then(data => displayPhoneDetail(data));
}

const displayPhoneDetail = id => {
    console.log(id);

    const phoneDetails = document.getElementById('phone-details');
    // clear error context data before the details
    phoneDetails.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${id.data.image}" class="card-img-top"  alt="...">
    <div class="card-body">
        <h5 class="card-title">${id.data.name}</h5>
        <p class="card-text">ReleaseDate: ${id.data.releaseDate}</p>
        <p class="card-text">MainFeatures</p>
        <p class="card-text">ChipSet: ${id.data.mainFeatures.chipSet}</p>
        <p class="card-text">Sensors: ${id.data.mainFeatures.sensors[0]}, ${id.data.mainFeatures.sensors[1]}
        , ${id.data.mainFeatures.sensors[2]}, ${id.data.mainFeatures.sensors[3]}, ${id.data.mainFeatures.sensors[4]}
        , ${id.data.mainFeatures.sensors[5]}</p>
        
        
        
    </div>
    `;
    phoneDetails.appendChild(div);

}



