const attendeeList = [];
function register() {
  const attendeeInput = document.getElementById("attendeeName");
  const attendeeVal = attendeeInput.value;
  if (attendeeVal === "") return;
  attendeeList.push(attendeeVal);
  attendeeInput.value = "";
  updateAttendeeView();
}

function updateAttendeeView() {
  document.getElementById("attendeeCount").innerHTML = attendeeList.length;
  const ul = document.getElementById("attendeeList");
  ul.innerHTML = "";
  for (const name of attendeeList) {
    const li = document.createElement("li");
    li.innerText = name;
    ul.appendChild(li);
  }
}

function calculate() {
  const prizeCount = parseInt(document.getElementById("prizeCount").value);
  if (prizeCount === NaN || prizeCount < 0) {
    alert("โปรดใส่จำนวนของรางวัลให้ถูกต้อง");
    return;
  }
  const prizeList = [];
  const attendeePrizeIdxList = [];
  const newAttendeeList = [];
  for (let priceNumber = 0; priceNumber < prizeCount; priceNumber++) {
    prizeList.push(priceNumber);
  }

  while (prizeList.length > 0) {
    const result = Math.floor(Math.random() * prizeList.length);
    attendeePrizeIdxList.push(prizeList[result]);
    prizeList.splice(result, 1);
  }
  {
    const oldAttendeeList = [...attendeeList];
    while (oldAttendeeList.length > 0) {
      const result = Math.floor(Math.random() * oldAttendeeList.length);
      newAttendeeList.push(oldAttendeeList[result]);
      oldAttendeeList.splice(result, 1);
    }
  }
  const ul = document.getElementById("result");
  ul.innerHTML = "";
  for (
    let attendeeIdx = 0;
    attendeeIdx < newAttendeeList.length;
    attendeeIdx++
  ) {
    const li = document.createElement("li");
    let str = `${attendeeIdx + 1}. ${newAttendeeList[attendeeIdx]} `;
    if (attendeeIdx >= attendeePrizeIdxList.length) str += `ไม่ได้รางวัล`;
    else str += `ได้รางวัลหมายเลข ${attendeePrizeIdxList[attendeeIdx] + 1}`;

    li.innerText = str;
    ul.appendChild(li);
  }
}
updateAttendeeView();
