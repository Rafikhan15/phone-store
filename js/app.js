const main = document.getElementById("main");
const phoneDetails = document.getElementById('phone-details');
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;
    // spinner block
    toggleSpinner('block');

    if (inputValue == "" || isNaN(inputValue) != true) { //isNaN check number or string /others


        error.innerText = "please give a phone name in world";
        // clear input data
        input.value = "";
        // clear input data before the search
        main.innerHTML = "";



    }
    // after error cheacking search box load the api

    else {
        // clear main context data before the search
        main.innerHTML = "";

        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            // .then(data => cardsDisplay(data.data));
            // 20 product displayed in website
            .then(data => cardsDisplay(data.data.slice(0, 20)));
        // clear input data
        input.value = "";
        // clear error context data before the search
        error.innerHTML = "";
        phoneDetails.innerHTML = "";
    }
}
// searching result display in website
const cardsDisplay = (cards) => {
    // cards.slice(0, 19);
    // console.log(cards);
    for (const card of cards) {
        console.log(card);
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-12");
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
    // spinner none
    toggleSpinner('none');
}

// product details load the search api 

const loadPhoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        // .then(data => displayPhoneDetail(data.data));
        .then(data => displayPhoneDetail(data));
}
// detail product info display in website
const displayPhoneDetail = id => {
    console.log(id.data.others.NFC);

    const phoneDetails = document.getElementById('phone-details');
    // clear error context data before the details
    phoneDetails.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${id.data.image}" class="card-img-top"  alt="...">
    <div class="card-body">
        <h5 class="card-title">${id.data.name}</h5>
        <p class="card-text">ReleaseDate: ${id.data.releaseDate ? id.data.releaseDate : "Not Avaible"}</p>
        <p class="card-text fw-bold">MainFeatures</p>
        <p class="card-text">ChipSet: ${id.data.mainFeatures.chipSet}</p>
        <p class="card-text fw-bold">Sensors</p>
        <p class="card-text">${id.data.mainFeatures.sensors[0]}, ${id.data.mainFeatures.sensors[1]},
        ${id.data.mainFeatures.sensors[2]}, ${id.data.mainFeatures.sensors[3]},
        ${id.data.mainFeatures.sensors[4]}, ${id.data.mainFeatures.sensors[5]}</p>
        <p class="card-text fw-bold">Other Features</p>
        <p class="card-text"><span class="fw-bold">WLAN</span>: ${id.data.others.WLAN}</p>
        <p class="card-text"><span class="fw-bold">Bluetooth</span>: ${id.data.others.Bluetooth}</p>
        <p class="card-text"><span class="fw-bold">GPS</span>: ${id.data.others.GPS}</p>
        <p class="card-text"><span class="fw-bold">NFC</span>: ${id.data.others.NFC}</p>
        
        
        
        
        
    </div>
    `;
    phoneDetails.appendChild(div);

}

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;

};




