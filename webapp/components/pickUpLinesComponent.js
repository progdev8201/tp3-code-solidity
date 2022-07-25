function getPickUpLineHtml(pickUpLine) {
    return `
        <div class="col-12 mt-4 p-2 shadow rounded">
          <p><strong>Id:</strong> ${pickUpLine.id}</p>
          <div class="d-flex justify-content-between">
            <p>
              <strong>Line:</strong> ${pickUpLine.line}
            </p>
            <button id="${pickUpLine.id}" class="btn btn-primary w-50">Complete</button>
          </div>
        </div>
    `;
}

async function getPickUpLines() {
    const pickUpLineLength = await tokenContract.methods.getPickUpLineLength().call();
    let pickUpLines = [];

    for (let index = 0; index < pickUpLineLength; index++) {
        pickUpLines.push(await tokenContract.methods.getPickUpLine(index).call());
    }

    return pickUpLines;
}

async function renderPickUpLines() {
    mainBody.innerHTML = '';

    (await getPickUpLines()).forEach(pickUpLine => mainBody.insertAdjacentHTML("beforeend",`${getPickUpLineHtml(pickUpLine)}`));

    mainBody.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", async () => {
            tokenContract.methods.completePickUpLine(parseInt(button.getAttribute('id'))).send({ from: userAccount })
            .on('receipt', () =>{
                initCompletedAmountOfPickUpLine();
                alert('Completed pick up line with success!');
            })
            .on('error', (error) => {
                if (error.message.includes('is already completed')) {
                    alert('You cannot complete a pick up line twice');
                }
            });
        });
    });
}
