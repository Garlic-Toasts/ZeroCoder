function search() {
    let input = document.getElementById("search_projects") as HTMLInputElement;
    let filter = input.value.toUpperCase().trim();
    let ul = document.getElementById("list");
    let li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("p")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || filter.length <0) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function projectSettings(){
    console.log("!");
}

