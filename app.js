const select = document.querySelector('#movie-select');
const seatjs = document.querySelector('.seatjs');
const seats = seatjs.querySelectorAll('.seat');
const seatNum = document.querySelector('.seatCount');
const money = document.querySelector('.moneyCount');
let selectSeats = 0;

// Functions
function showSeats(seatNumber){
    seatNum.innerText = `${seatNumber}`;
}

function handleChange(seats){
    let price = select.value;
    money.innerText = price*seatNum.innerText;
}

// EventListener
seats.forEach((seat) => {
    seat.addEventListener('click', (e) => {
        const divSeat = e.target;
        if(divSeat.className === 'seat'){
            divSeat.classList.add('selected');
            selectSeats++;
        } else if(divSeat.className === 'seat selected'){
            divSeat.classList.remove('selected');
            selectSeats--;
        }
        showSeats(selectSeats);
        handleChange(selectSeats);
    });
});

select.addEventListener('change', handleChange);
