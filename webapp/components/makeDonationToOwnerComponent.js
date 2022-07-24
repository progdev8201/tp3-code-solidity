function replaceSpinnerByButtonAndClearInput(){
    const buttonDiv = mainBody.querySelector('form div');
    document.querySelector('input').value = '';
    
    buttonDiv.innerHTML = `
    <button class="btn btn-primary w-75" type="submit">Create</button>
    `;
}

function replaceButtonBySpinner(){
    const buttonDiv = mainBody.querySelector('form div');

    buttonDiv.innerHTML = `
    <div class="spinner-border text-primary mx-auto" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    `;
}

async function makeDonation(e){
    e.preventDefault();
    const value = mainBody.querySelector('input').value;
    
    replaceButtonBySpinner();
    
    await tokenContract.methods.makeDonationToOwner().send({ from: userAccount, value: web3.utils.toWei(value, "ether") })
    .on('receipt', () => {
        replaceSpinnerByButtonAndClearInput();
    })
    .on('error', () => {
        replaceSpinnerByButtonAndClearInput();
        alert('Vous n\'avez pas les droits');
    });
}

function addEventListenerToDonationForm(){
    const form = document.querySelector('form');
    form.removeEventListener('submit', makeDonation);
    form.addEventListener('submit', makeDonation);
}

function renderMakeDonationForm(){
    mainBody.innerHTML = `
    <div class="col-6 mt-5 p-5 rounded mx-auto shadow-lg">
        <form class="mx-auto">
            <h1 class="text-center text-muted">Send money to owner</h1>
            <input type="number" step="0.01" class="form-control" placeholder="amount" maxlength="255" required>
            <div class="text-center mt-3">
                <button class="btn btn-primary w-75" type="submit">Send</button>
            </div>
        </form>
    </div>
    `;

    addEventListenerToDonationForm();
}
