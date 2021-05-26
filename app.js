const select = document.querySelector('#movie-select');
const seatjs = document.querySelector('.seatjs');
const seats = seatjs.querySelectorAll('.seat');
const seatNum = document.querySelector('.seatCount');
const money = document.querySelector('.moneyCount');
loadData();

let ticket = select.value;

// Save Data
function setMovieData(movie, price){
    localStorage.setItem('selectedMovie', movie);
    localStorage.setItem('selectedMovieCost', price);
}

function updateCountPrice(){
    const selectedSeats = seatjs.querySelectorAll('.seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const seatCount = selectedSeats.length;

    seatNum.innerText = seatCount;
    money.innerText = seatCount * ticket;

    setMovieData(select.selectedIndex, select.value);
}

// Load Data
function loadData(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovie = localStorage.getItem('selectedMovie');
    if(selectedMovie !== null){
        select.selectedIndex = selectedMovie;
    }
}

// Event Listeners
select.addEventListener('change', (e) => {
    ticket = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCountPrice();
});

seats.forEach((seat, index) => {
    seat.addEventListener('click', (e) => {
        if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
            e.target.classList.toggle('selected');
            updateCountPrice();
        }
    });
});

// Call Initial Settings
updateCountPrice();
