async function makeDonation(e){
    e.preventDefault();
    const value = mainBody.querySelector('input').value;
    
    replaceButtonBySpinner();
    
    await tokenContract.methods.makeDonationToOwner().send({ from: userAccount, value: web3.utils.toWei(value, "ether") })
    .on('receipt', () => {
        alert('Donation sent with success')
    });

    replaceSpinnerByButtonAndClearInput();
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
            <input type="number" step="0.01" class="form-control" placeholder="amount" required>
            <div class="text-center mt-3">
                <button class="btn btn-primary w-75" type="submit">Send</button>
            </div>
        </form>
    </div>
    `;

    addEventListenerToDonationForm();
}
