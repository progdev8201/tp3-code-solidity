async function setAmountOfPickUpLine(e){
    e.preventDefault();
    const value = mainBody.querySelector('input').value;
    
    replaceButtonBySpinner();
    
    await tokenContract.methods.setAmountOfPickUpLine(parseInt(value)).send({ from: userAccount })
    .on('receipt', () => {
        alert('Amount of pickup line set with success');
        initCompletedAmountOfPickUpLine();
    });

    replaceSpinnerByButtonAndClearInput();
}

function addEventListenerToSetCompletedPickUpLineForm(){
    const form = document.querySelector('form');
    form.removeEventListener('submit', setAmountOfPickUpLine);
    form.addEventListener('submit', setAmountOfPickUpLine);
}

function renderSetCompletedPickUpLineForm(){
    mainBody.innerHTML = `
    <div class="col-6 mt-5 p-5 rounded mx-auto shadow-lg">
        <form class="mx-auto">
            <h1 class="text-center text-muted">Set completed amount</h1>
            <input type="number" class="form-control" placeholder="amount" required>
            <div class="text-center mt-3">
                <button class="btn btn-primary w-75" type="submit">Send</button>
            </div>
        </form>
    </div>
    `;

    addEventListenerToSetCompletedPickUpLineForm();
}
