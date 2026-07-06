const cards = document.getElementById("cards");

function renderCards(list = data) {

    cards.innerHTML = "";

    list.forEach((item, index) => {

        cards.innerHTML += `
        <div class="card">

            <h2>${item.title}</h2>

            <div class="content" id="content${index}">
${item.text}
            </div>

            <div class="buttons">

                <button class="show-btn" onclick="toggleContent(${index},this)">
                    👁 ดูข้อความ
                </button>

                <button class="copy-btn" onclick="copyText(${index},this)">
                    📋 คัดลอก
                </button>

            </div>

        </div>
        `;

    });

}

renderCards();

function toggleContent(index, button) {

    const box = document.getElementById("content" + index);

    if (box.style.display === "block") {

        box.style.display = "none";
        button.innerHTML = "👁 ดูข้อความ";

    } else {

        box.style.display = "block";
        button.innerHTML = "🙈 ซ่อนข้อความ";

    }

}

function copyText(index, button) {

    navigator.clipboard.writeText(data[index].text);

    const oldText = button.innerHTML;

    button.innerHTML = "✅ คัดลอกแล้ว";

    button.disabled = true;

    setTimeout(() => {

        button.innerHTML = oldText;
        button.disabled = false;

    }, 1500);

}

function searchCard() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const result = data.filter(item =>
        item.title.toLowerCase().includes(keyword)
    );

    renderCards(result);
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("คัดลอกแล้ว!");
    });
}
}