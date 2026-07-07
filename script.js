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

}
// ======================
// ตรวจเลข
// ======================

function checkNumbers() {

    let rawInput = document.getElementById("numberInput").value;

    // เปลี่ยนตัวคั่นให้เป็นช่องว่าง
    let normalizedInput = rawInput.replace(/[,\.\/\-\n]/g," ");

    // แยกข้อมูล
    let tokens = normalizedInput.split(/\s+/);

    // เหลือเฉพาะเลข 2-3 หลัก
    let nums = tokens.filter(token => /^\d{2,3}$/.test(token));

    let countMap = new Map();

    nums.forEach(num=>{
        countMap.set(num,(countMap.get(num)||0)+1);
    });

    let duplicateHTML="";

    let duplicateCount=0;

    countMap.forEach((count,num)=>{

        if(count>1){

            duplicateCount++;

            duplicateHTML+=`🔴 ${num} → ${count} ครั้ง<br>`;

        }

    });

    document.getElementById("result").innerHTML=`

    <b>📊 สรุปผล</b><br><br>

    จำนวนเลขทั้งหมด : ${nums.length}<br>

    จำนวนเลขไม่ซ้ำ : ${countMap.size}<br>

    จำนวนเลขที่ซ้ำ : ${duplicateCount}<br><br>

    <hr>

    ${duplicateHTML || "✅ ไม่พบเลขซ้ำ"}

    `;

}

function clearAll(){

    document.getElementById("numberInput").value="";

    document.getElementById("result").innerHTML="ผลการตรวจจะแสดงตรงนี้";

}
