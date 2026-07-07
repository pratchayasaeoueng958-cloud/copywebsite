// ==========================================
// Lucky Number v2
// ==========================================

// -----------------------------
// ตัวแปรหลัก
// -----------------------------

const cards = document.getElementById("cards");
const searchInput = document.getElementById("search");
const numberInput = document.getElementById("numberInput");
const resultBox = document.getElementById("result");


// ==========================================
// สร้างการ์ดชุดข้อความ
// ==========================================

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

                <button
                    class="show-btn"
                    onclick="toggleContent(${index}, this)">

                    👁 ดูข้อความ

                </button>

                <button
                    class="copy-btn"
                    onclick="copyText(${index}, this)">

                    📋 คัดลอก

                </button>

            </div>

        </div>

        `;

    });

}


// โหลดข้อมูลทันทีเมื่อเปิดเว็บ

renderCards();
// ==========================================
// แสดง / ซ่อนข้อความ
// ==========================================

function toggleContent(index, button) {

    const content = document.getElementById("content" + index);

    if (content.style.display === "block") {

        content.style.display = "none";

        button.innerHTML = "👁 ดูข้อความ";

    } else {

        content.style.display = "block";

        button.innerHTML = "🙈 ซ่อนข้อความ";

    }

}


// ==========================================
// คัดลอกข้อความ
// ==========================================

function copyText(index, button) {

    navigator.clipboard.writeText(data[index].text);

    const oldText = button.innerHTML;

    button.innerHTML = "✅ คัดลอกแล้ว";

    button.disabled = true;

    setTimeout(() => {

        button.innerHTML = oldText;

        button.disabled = false;

    },1500);

}


// ==========================================
// ค้นหาหัวข้อ
// ==========================================

function searchCard(){

    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword===""){

        renderCards();

        return;

    }

    const result = data.filter(item=>{

        return item.title.toLowerCase().includes(keyword);

    });

    renderCards(result);

}
// ==========================================
// แยกเลขจากข้อความ
// ==========================================

function getNumbers(rawInput) {

    let normalized = rawInput.replace(/[,\.\/\-\n]/g, " ");

    let tokens = normalized.split(/\s+/);

    return tokens.filter(token => /^\d{2,3}$/.test(token));

}


// ==========================================
// นับจำนวนเลข
// ==========================================

function countDuplicates(numbers){

    const countMap = new Map();

    numbers.forEach(num=>{

        countMap.set(num,(countMap.get(num)||0)+1);

    });

    return countMap;

}


// ==========================================
// ตรวจเลขซ้ำ
// ==========================================

function getDuplicateList(countMap){

    const duplicateList=[];

    countMap.forEach((count,num)=>{

        if(count>1){

            duplicateList.push({

                number:num,

                count:count

            });

        }

    });

    duplicateList.sort((a,b)=>{

        if(b.count!==a.count){

            return b.count-a.count;

        }

        return a.number.localeCompare(b.number);

    });

    return duplicateList;

}
// ==========================================
// ตรวจกลุ่มเลขกลับ
// ==========================================

function findReverseGroups(numbers){

    const groupMap = new Map();

    numbers.forEach(num=>{

        // เรียงตัวเลขจากน้อยไปมาก
        const key = num.split("").sort().join("");

        if(!groupMap.has(key)){

            groupMap.set(key,new Set());

        }

        groupMap.get(key).add(num);

    });

    const result=[];

    groupMap.forEach((set,key)=>{

        // เอาเฉพาะกลุ่มที่มีเลขกลับมากกว่า 1 แบบ
        if(set.size>1){

            result.push({

                key:key,

                numbers:Array.from(set).sort()

            });

        }

    });

    // เรียงกลุ่มตาม key
    result.sort((a,b)=>a.key.localeCompare(b.key));

    return result;

}

// ==========================================
// ตรวจเลข
// ==========================================

function checkNumbers() {

    const numbers = getNumbers(numberInput.value);

    if (numbers.length === 0) {

        resultBox.innerHTML = `
            <div style="color:red;font-weight:bold;">
                ❌ ไม่พบเลข 2 หรือ 3 หลัก
            </div>
        `;

        return;
    }

    // นับเลขซ้ำ
    const countMap = countDuplicates(numbers);
    const duplicateList = getDuplicateList(countMap);

    // กลุ่มเลขกลับ
    const reverseGroups = findReverseGroups(numbers);

    let html = "";

    html += `
        <div style="
            background:#ffffff;
            border-radius:10px;
            padding:15px;
            line-height:1.8;
            color:#222;
        ">
    `;

    html += `<h3 style="margin-bottom:10px;">📊 สรุปผล</h3>`;

    html += `
        จำนวนเลขทั้งหมด :
        <b>${numbers.length}</b><br>

        จำนวนเลขไม่ซ้ำ :
        <b>${countMap.size}</b><br>

        จำนวนเลขที่ซ้ำ :
        <b>${duplicateList.length}</b><br>

        จำนวนกลุ่มเลขกลับ :
        <b>${reverseGroups.length}</b>
    `;

    html += "<hr>";

    // ==========================
    // เลขซ้ำ
    // ==========================

    html += `<h3>🔴 เลขซ้ำ</h3>`;

    if (duplicateList.length === 0) {

        html += `✅ ไม่พบเลขซ้ำ`;

    } else {

        duplicateList.forEach(item => {

            html += `
                <div style="color:red;font-weight:bold;">
                    ${item.number}
                    →
                    ${item.count}
                    ครั้ง
                </div>
            `;

        });

    }

    html += "<hr>";

    // ==========================
    // เลขกลับ
    // ==========================

    html += `<h3>🔄 กลุ่มเลขกลับ</h3>`;

    if (reverseGroups.length === 0) {

        html += `✅ ไม่พบเลขกลับ`;

    } else {

        reverseGroups.forEach(group => {

            html += `
                <div style="
                    border:1px solid #ddd;
                    border-radius:8px;
                    padding:10px;
                    margin-bottom:10px;
                ">
            `;

            html += `
                <div style="
                    font-weight:bold;
                    margin-bottom:8px;
                ">
                    กลุ่ม ${group.key}
                </div>
            `;

            html += `
                <div style="
                    color:red;
                    font-weight:bold;
                    line-height:1.8;
                ">
                    ${group.numbers.join(" , ")}
                </div>
            `;

            html += `</div>`;

        });

    }

    html += "<hr>";

    html += `
        <button
            onclick="copyResult()"
            class="copy-btn">

            📋 คัดลอกผลตรวจ

        </button>
    `;

    html += "</div>";

    resultBox.innerHTML = html;

}


// ==========================================
// คัดลอกผลตรวจ
// ==========================================

function copyResult(){

    navigator.clipboard.writeText(resultBox.innerText);

}


// ==========================================
// ล้างข้อมูล
// ==========================================

function clearAll(){

    numberInput.value="";

    resultBox.innerHTML="ผลการตรวจจะแสดงตรงนี้";

}