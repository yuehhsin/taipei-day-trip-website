let pathId = decodeURIComponent(location.pathname).split("/")[2];
let selAM = document.getElementById("selAM")
let selPM = document.getElementById("selPM")
let tourPrice = document.getElementById("tourPrice")
let selectedAM = false;
let selectedPM = false;
let imageId = 0;

function randerData(attName,attCategory,attMrt,attDescription,attAddress,attTransport){
    let ATTname = document.getElementById("attName"); //name
    let name = document.createTextNode(attName);
    ATTname.appendChild(name);

    let ATTtype = document.getElementById("attType"); //type = actegory + mrt
    let type = document.createTextNode(attCategory+" at "+attMrt);
    ATTtype.appendChild(type);

    let ATTdes = document.getElementById("attDes"); //description
    let des = document.createTextNode(attDescription);
    ATTdes.appendChild(des);

    let ATTaddress = document.getElementById("attAddress"); //address
    let address = document.createTextNode(attAddress);
    ATTaddress.appendChild(address);

    let ATTtransport = document.getElementById("attTransport"); //transport
    let transport = document.createTextNode(attTransport);
    ATTtransport.appendChild(transport);
}
function getData(){
    fetch("/api/attraction/"+pathId)
    .then((response=>{
        return response.json()
    }))
    .then((data)=>{
        attImage = data["data"]["images"]
        let attName = data["data"]["name"]
        let attCategory = data["data"]["category"]
        let attMrt = data["data"]["mrt"]
        let attDescription = data["data"]["description"]
        let attAddress = data["data"]["address"]
        let attTransport = data["data"]["transport"]
        randerData(attName,attCategory,attMrt,attDescription,attAddress,attTransport)
        renderImage(attImage)
    })
}

function renderImage(attImage){
    let ATTimage = document.getElementById("attImage");
    let image = attImage[imageId];
    ATTimage.style.backgroundImage="url"+"("+image+")";
    ATTimage.style.backgroundSize="cover";
}
function selBTN(selBTN){
    let selcted = document.createElement("div")
    selcted.id="selctedBTN"
    selBTN.appendChild(selcted)
}
function cancelBTN(selBTN){
    let selected = document.getElementById("selctedBTN")
    selBTN.removeChild(selected)
}

function backImageBTN(){
    if (imageId-1>=0){
        imageId+=-1;
    }
    renderImage(attImage)
}
function nextImageBTN(){
    console.log(imageId)
    if (imageId+1<attImage.length){
        imageId+=1;
    }
    renderImage(attImage)
}


//EVENT: 初始載入畫面
addEventListener("load",(e)=>{
    getData()
})

//EVENT: 點擊早上/下午BTN
function AMprice(){
    let amPrice = document.createTextNode("新台幣2000元")
    tourPrice.innerHTML=""
    tourPrice.appendChild(amPrice)
}
function PMprice(){
    let pmPrice = document.createTextNode("新台幣2500元")
    tourPrice.innerHTML=""
    tourPrice.appendChild(pmPrice)
}
selAM.addEventListener("click",(e)=>{  //sel AM
    if (selectedAM===false & selectedPM===false){
        selBTN(selAM);
        selectedAM=true;
        AMprice()
    }
    else if(selectedAM===false & selectedPM===true){
        cancelBTN(selPM);
        selectedPM=false;
        selBTN(selAM);
        selectedAM=true;
        let amPrice = document.createTextNode("新台幣2000元")
        tourPrice.appendChild(amPrice)
        AMprice()
    }
})
selPM.addEventListener("click",(e)=>{   //sel PM
    if (selectedPM===false & selectedAM===false){
        selBTN(selPM);
        selectedPM=true;
        PMprice()
    }
    else if(selectedPM===false & selectedAM===true){
        cancelBTN(selAM);
        selectedAM=false;
        selBTN(selPM);
        selectedPM=true;
        PMprice()
    }
})


