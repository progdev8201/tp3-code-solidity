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

function addEventListenerToForm(){
    const form = document.querySelector('form');

    form.addEventListener('submit',async function(e) {
        e.preventDefault();
        const line = form.querySelector('input').value;
        const pickUpLineMessage = {id: 0, line};

        replaceButtonBySpinner();

        await tokenContract.methods.addPickUpLine(pickUpLineMessage).send({ from: userAccount})
        .on('receipt', function(receipt){
            replaceSpinnerByButtonAndClearInput();
        })
        .on('error', function(error) {
            replaceSpinnerByButtonAndClearInput();
            alert('Vous n\'avez pas les droits');
        });
    });
}

function renderPickUpLineForm(){

    mainBody.innerHTML = `
    <div class="col-6 mt-5 p-5 rounded mx-auto shadow-lg">
        <form class="mx-auto">
            <h1 class="text-center text-muted">Add pick up line</h1>
            <input type="text" class="form-control" placeholder="Enter pick up line" maxlength="255" required>
            <div class="text-center mt-3">
                <button class="btn btn-primary w-75" type="submit">Create</button>
            </div>
        </form>
    </div>
    `;

    addEventListenerToForm();
}
