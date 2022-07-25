const menu = document.getElementById("menu");
const buttons = [
    { id: "addPickUpLine", text: "Add pick up lines" },
    { id: "setCompletedPickUpLine", text: "Set completed pick up line amount" },
    { id: "seePickUpLine", text: "See pick up lines" },
    { id: "makeDonation", text: "Make donation to owner" },
];

async function isOwner() {
    return (userAccount.toLowerCase() == (await tokenContract.methods.owner().call()).toLowerCase());
}

async function renderMenu() {
    const ownerConnected = await isOwner();
    menu.innerHTML = "";
    mainBody.innerHTML = "";

    for (let index = 0; index < buttons.length; index++) {
        if (((index == 0 || index == 1) && !ownerConnected) || (index == 3 && ownerConnected)) continue;
        const button = buttons[index];

        menu.insertAdjacentHTML(
            "beforeEnd",
            `
            <div class="${ownerConnected ? 'col-4' : 'col-6'}">
                <button id="${button.id}" class="btn btn-primary w-100 shadow">
                    ${button.text}
                </button>
            </div>
        `
        );
    }

    addEventListenersToButtons();
}

function addEventListenersToButtons() {
    const addPickUpLineButton = document.getElementById("addPickUpLine");
    const seePickUpLineButton = document.getElementById("seePickUpLine");
    const makeDonationToOwnerButton = document.getElementById("makeDonation");
    const setCompletedPickUpLineButton = document.getElementById("setCompletedPickUpLine");

    if (addPickUpLineButton) {
        addPickUpLineButton.addEventListener("click", function () {
            renderPickUpLineForm();
        });
    }

    seePickUpLineButton.addEventListener("click", async function () {
        await renderPickUpLines();
    });

    if (makeDonationToOwnerButton) {
        makeDonationToOwnerButton.addEventListener("click", function () {
            renderMakeDonationForm();
        });
    }

    if (setCompletedPickUpLineButton) {
        setCompletedPickUpLineButton.addEventListener("click", function() {
            renderSetCompletedPickUpLineForm();
        });
    }
}
