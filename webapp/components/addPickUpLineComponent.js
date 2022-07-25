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

async function addPickUpLine(e){
    e.preventDefault();
    const line = mainBody.querySelector('input').value;
    const pickUpLineMessage = {id: 0, line};
    
    replaceButtonBySpinner();
    
    await tokenContract.methods.addPickUpLine(pickUpLineMessage).send({ from: userAccount})
    .on('receipt', () =>{
        alert('added pick up line with success!');
    })
    .on('error', (error) => {
        if (error.message.includes('You\'re not the owner')) {
            alert('You do not have the rights');
        }
    });
    
    replaceSpinnerByButtonAndClearInput();
}

function addEventListenerToPickUpForm(){
    const form = document.querySelector('form');
    form.removeEventListener('submit', addPickUpLine);
    form.addEventListener('submit',addPickUpLine);
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

    addEventListenerToPickUpForm();
}
