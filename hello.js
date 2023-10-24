const loadData = (name, limit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${name}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showPhones(data.data, limit))
    .catch(er => console.log(er));
};

const showPhones = (data, limit) => {
  const phoneContainer = document.getElementById('phoneContainer');
  phoneContainer.innerHTML = '';

  if (data.length === 0) {
    document.getElementById(
      'NoFound'
    ).innerHTML = `<h2 class="text-center text-warning"> No Product found </h2>`;
  } else {
    document.getElementById('NoFound').innerHTML = ``;
  }
  if (limit === 8 && data.length > 8) {
    data = data.slice(0, 8);
    showAllProduct(true);
  } else {
    showAllProduct(false);
  }
  data.forEach(element => {
    const { slug, phone_name, image, brand } = element;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
   <div class="card shadow border-0 p-2 h-100">
      <img src="${image}" class="card-img-top h-75" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone_name}</h5>
        <p class="card-text">Brand: ${brand}</p>
         <div>
           <button onclick="loadDetails('${slug}')" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button>
           <button onclick="loadCart('${slug}')"  class="btn btn-warning">Add To Cart</button>
          </div> 
      </div>
    </div>
  `;
    phoneContainer.appendChild(div);
  });
  document.getElementById('loader').classList.add('d-none');
};

// search phone by btn
document.getElementById('searchPhone').addEventListener('click', () => {
  dataShow(8);
});
// search phone by press enter key
document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    dataShow(8);
  }
});
// show all product btn show
const showAllProduct = isbtn => {
  if (isbtn) {
    document.getElementById('showContainer').classList.remove('d-none');
  } else {
    document.getElementById('showContainer').classList.add('d-none');
  }
};

// show all btn section
document.getElementById('showAll').addEventListener('click', () => {
  dataShow();
});

// common function for data
const dataShow = limit => {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput === '') {
    document.getElementById('alert').classList.remove('d-none');
    window.location.href = '';
    return;
  } else {
    document.getElementById('alert').classList.add('d-none');
  }
  document.getElementById('loader').classList.remove('d-none');
  window.location.href = '#phoneContainer';
  loadData(searchInput ? searchInput : 'iphone', limit);
};

// load  details data
const loadDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.data));
};

// show details data
const showDetail = data => {
  const detailsBody = document.getElementById('detailsBody');
  const { releaseDate, name, image, mainFeatures, brand } = data;
  const { storage, sensors, memory, displaySize, chipSet } = mainFeatures;
  document.getElementById('detailsTitle').innerText = `${name}`;
  detailsBody.innerHTML = `
     <div class="text-center">
     <img src="${image}" alt="">
     </div>
    <p class="mt-5">Brand: ${brand}</p>
    <p>Release Date: ${releaseDate}</p>
    <p>Storage: ${storage}</p>
    <p>Memory: ${memory}</p>
    <p>Display Size: ${displaySize}</p>
    <p>Chipset: ${chipSet}</p>
    <p></p>
  `;
};

// cart show btn section
document.getElementById('cartBtn').addEventListener('click', () => {
  const contaner = document.getElementById('cartSection');
  if (contaner.classList == 'show') {
    contaner.style.left = '0px';
    contaner.classList.remove('show');
  } else {
    contaner.style.left = '-100%';
    contaner.classList.add('show');
  }
});

// load data in cart section
const loadCart = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showCart(data.data));
};
let count = 0;
// show data  in cart section
const showCart = data => {
  count += 1;
  console.log(data);
  const cartBody = document.getElementById('cartSection');
  const { releaseDate, name, image, mainFeatures, brand } = data;
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${brand}</p>
        <p class="card-text"><small class="text-body-secondary">${releaseDate}</small></p>
      </div>
    </div>
  </div>
</div>
  `;
  cartBody.appendChild(div);
  document.getElementById('noProduct').classList.add('d-none');
  document.getElementById('count').innerText = count;
  document.getElementById('count').style.backgroundColor = 'red';
};
loadData('iphone', 8);
