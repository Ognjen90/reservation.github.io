var booking = {
    reservations: [],
    addRes: function (reservation) {
        this.reservations.push({
            reservation: reservation,
            confirmed: false
        });
        view.displayRes();
    },
    changeRes: function (resNumber, newRes) {

        this.reservations[resNumber].reservation = newRes;
        view.displayRes();
    },
    deleteRes: function (resNumber) {
        this.reservations.splice(resNumber, 1);
        view.displayRes();
    },
    resConfirmed: function (resNumber) {
        var reservation = this.reservations[resNumber];
        reservation.confirmed = !reservation.confirmed;
        view.displayRes();
    },
    confirmAll: function () {
        var confirmedRes = 0;
        var totalConfirmedRes = this.reservations.length;
        this.reservations.forEach(function (reservation) {
            if (reservation.confirmed === true) {
                confirmedRes++;
            }
        });

        this.reservations.forEach(function (reservation) {
            if (confirmedRes === totalConfirmedRes) {
                reservation.confirmed = false;
            } else {
                reservation.confirmed = true;
            }
        });


        view.displayRes();

    },
    deleteAll: function () {
        this.reservations = [];
        view.displayRes();
    }
};

var handlers = {
    confirmAll: function () {
        booking.confirmAll();
    },
    deleteAll: function () {
        booking.deleteAll();
    },
    addRes: function () {
        var addResInput = document.getElementById("addResInput");
        booking.addRes(addResInput.value);
        addResInput.value = "";
    },
    changeRes: function () {
        var addResNumber = document.getElementById("addResNumber");
        var addNewRes = document.getElementById("addNewRes");
        booking.changeRes(addResNumber.valueAsNumber, addNewRes.value);
        addNewRes.value = "";
        addResNumber.value = "";
    },
};

var view = {
    displayBookingCounters: function () {
        var confirmedResP = document.getElementById('confirmedRes');
        var unconfirmedResP = document.getElementById('unconfirmedRes');
        confirmedResP.innerHTML = '';
        unconfirmedResP.innerHTML = "";
        var confirmedRes = [];
        var unconfirmedRes = [];
        booking.reservations.forEach(function (reservation) {
            if (reservation.confirmed === true) {
                confirmedRes.push(reservation);
            } else {
                unconfirmedRes.push(reservation);
            }
        });
        confirmedResP.innerHTML = confirmedRes.length;
        unconfirmedResP.innerHTML = unconfirmedRes.length;
    },
    createCheckBoxInput: function (reservation) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.disabled = true;
        checkbox.checked = reservation.confirmed;
        return checkbox;
    },
    displayRes: function () {
        this.displayBookingCounters();
        var ul = document.querySelector("ul");
        ul.innerHTML = "";
        if (booking.reservations.length === 0) {
            ul.innerHTML = "there aren't reservations";
        } else {
            booking.reservations.forEach(function (reservation, position) {
                ul.appendChild(this.createReservationLi(reservation, position));
            }, this);
        }
    },
    createReservationLi: function (reservation, position) {
        var li = document.createElement("li");
        li.id = position;
        li.innerHTML = reservation.reservation;
        li.appendChild(this.createCheckBoxInput(reservation));
        li.appendChild(this.createDeleteButton());
        li.appendChild(this.createConfirmButton());
        return li;
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.className = "deleteButton";
        return deleteButton
    },
    createConfirmButton: function () {
        var confirmButton = document.createElement("button");
        confirmButton.textContent = "confirm";
        confirmButton.className = "confirmButton";
        return confirmButton;
    },
    setUpEventListeners: function () {
        this.setUpUlEventListeners();
        this.setUpInputEventListener();
    },
    setUpUlEventListeners: function () {
        var ul = document.querySelector("ul");
        ul.addEventListener("click", function (event) {
            var id = event.target.parentNode.id;
            var idAsNumber = parseInt(id);
            if (event.target.className === "deleteButton") {
                booking.deleteRes(idAsNumber);
            } else if (event.target.className === "confirmButton") {
                booking.resConfirmed(idAsNumber);
            }
        });
    },
    setUpInputEventListener: function () {
        var addResInput = document.getElementById("addResInput");
        addResInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                handlers.addRes();
            }
        });
    }

}
view.displayRes();
view.setUpEventListeners();