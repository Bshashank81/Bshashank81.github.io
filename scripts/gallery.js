function jsonImages() {
    let images;
    if(localStorage.getItem("images") === null) {
        images = gallery["images"];
        var jsonImages = JSON.stringify(images);
        localStorage.setItem("images",jsonImages);
    }
    images = JSON.parse(localStorage.getItem("images"));
    var divId = document.getElementById("gallery");
    for(i=0;i<images.length;i++){
        let image = images[i];
        let img = document.createElement("img");
        img.src = image.src;
        img.setAttribute("width",image.width);
        img.setAttribute("height",image.height);
        if(i === 0){
            img.setAttribute("class",image.className);
        }
        divId.appendChild(img);
    }
}

function loadImages() {
    var images;
    if(localStorage.getItem("images") === null) {
        images = gallery["images"];
        localStorage.setItem("images",JSON.stringify(images));
    }
    images = JSON.parse(localStorage.getItem("images"));
    var divId = document.getElementById("gallery");
    for(var i=0;i<images.length;i++){
        let image = images[i];
        let img = document.createElement("img");
        img.src = image.src;
        img.setAttribute("width",image.width);
        img.setAttribute("height",image.height);
        img.setAttribute("id",i+"");
        img.setAttribute("onclick","showButtons("+i+")");
        if(i === 0){
            img.setAttribute("class",image.className);
        }
        else if( i > 0){
            img.setAttribute("class","editable");
        }
        divId.appendChild(img);
    }
}

let currentImage;
function showButtons(i) {
    document.getElementById("editDiv").style.display = "flex";
    document.getElementById("editDiv").style.justifyContent = "center";
    document.getElementById("deleteDiv").style.display = "flex";
    document.getElementById("deleteDiv").style.justifyContent = "center";
    currentImage = i;
    console.log(i);
    if(document.getElementById("edit-form").style.display !== "none"){
        document.getElementById("edit-form").style.display = "none";
        edit();
    }
}

function del() {
    var images = JSON.parse(localStorage.getItem("images"));
    var image = images[currentImage];
    var name = image.name;
    var url = image.src;
    var info = image.info;
    var date = image.date;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    var modalImage = document.getElementById("modalImage");
    modalImage.setAttribute("src",url);
    var button = document.getElementById("confirm");
    var cancel = document.getElementById("no");
    button.onclick = function() {
        images.splice(currentImage,1);
        localStorage.setItem("images",JSON.stringify(images));
        modal.style.display = "none";
        alert("Deleted successfully!");
        window.location.reload();
    }
    cancel.onclick = function() {
        modal.style.display = "none";
    }
}

function add(){
    document.getElementById("edit-form").style.display = "none";
    var form_add_id = document.getElementById('add-form');
    if(form_add_id.style.display === "flex")
        form_add_id.style.display = "none";
    else
        form_add_id.style.display = "flex";
}

function edit() {
    document.getElementById("add-form").style.display = "none";
    var element = document.getElementById("edit-form");
    console.log("edit"+currentImage);
    var images = localStorage.getItem("images");
    images = JSON.parse(images);
    console.log(images[0].src);
    if(element.style.display === "none")
        element.style.display = "flex";
    else
        element.style.display = "none";
    document.getElementById("name").value = images[currentImage].name;
    document.getElementById("url").value = images[currentImage].src;
    document.getElementById("message").value = images[currentImage].alt;
    document.getElementById("date").value = images[currentImage].date;
}

function add_form_validation(){
    var name = document.getElementById("add_form_name").value;
    var url = document.getElementById("add_form_url").value;
    var info = document.getElementById("add_form_message").value;
    var date = document.getElementById("add_form_date").value;

    var nameRegex =  /^[a-zA-Z ]{2,30}$/;;
    var urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
    var infoRegex =  /^[a-zA-Z. ]{2,200}$/;
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    var currentDate = new Date();
    var uploadedDate = new Date(date);
    console.log(currentDate);

    if((nameRegex.test(name)===false)){
        alert("name format is wrong");
        return false;
    }

    if(!(urlRegex.test(url))){
        alert("url format is wrong");
        return false;
    }

    if(!(infoRegex.test(info))){
        alert("info entered is wrong");
        return false;
    }

    if(!(dateRegex.test(date))){
        alert("date format is wrong");
        return false;
    }

    if(currentDate<uploadedDate){
        alert("uploadedDate cannot be in the future");
        return false;
    }
    return true;

}

function addForm(){
    if(add_form_validation() === true){
        var image = {
            "name" : document.getElementById("add_form_name").value,
            "src" : document.getElementById("add_form_url").value,
            "alt" : document.getElementById("add_form_message").value,
            "date" : document.getElementById("add_form_date").value,
            "width" : "200px",
            "height" : "200px" 
        }
        var images = JSON.parse(localStorage.getItem("images"));
        images.push(image);
        localStorage.setItem("images",JSON.stringify(images));
        alert("image submitted successfully");
        return true;
    }
    else{
        return false;
    }
}





function edit_form_validation(){
    var name = document.getElementById("name").value;
    /*var url = document.getElementById("url").value;*/
    var info = document.getElementById("message").value;
    var date = document.getElementById("date").value;

    var nameRegex =  /^[a-zA-Z ]{2,30}$/;;
    //var urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
    var infoRegex =  /^[a-zA-Z. ]{2,200}$/;
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    var currentDate = new Date();
    var uploadedDate = new Date(date);
    console.log(currentDate);

    if((nameRegex.test(name)===false)){
        alert("name format is wrong");
        return false;
    }

    /*if(!(urlRegex.test(url))){
        alert("url format is wrong");
        return false;
    }*/

    if(!(infoRegex.test(info))){
        alert("info entered is wrong");
        return false;
    }

    if(!(dateRegex.test(date))){
        alert("date format is wrong");
        return false;
    }

    if(currentDate<uploadedDate){
        alert("uploadedDate cannot be in the future");
        return false;
    }
    return true;
}

function editForm() {
    if(edit_form_validation() === true){
        var images = JSON.parse(localStorage.getItem("images"));
        images[currentImage].name = document.getElementById("name").value;
        images[currentImage].src = document.getElementById("url").value;
        images[currentImage].alt = document.getElementById("message").value;
        images[currentImage].date = document.getElementById("date").value;
        console.log(images[currentImage].alt);
        localStorage.setItem("images",JSON.stringify(images));
        alert("Submitted succesfully!");
        return true;
    }
    else{
        return false;
    }
}
















