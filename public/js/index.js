function GojsatableOfJson(json, edit) {
    // div table_id
    let div = document.getElementById("table_id")
    let table = document.createElement("table");
    const styleTable = `
    width: 100%;
    box-shadow: 3px 3px 6px #c6c6c6;
    `;
    table.setAttribute("style", styleTable)
    table.setAttribute("id", "myTable")
    let tBody = document.createElement("tbody")
    let firstTr = document.createElement("tr")
    let style
    let styleTd = `
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    `;
    Object.entries(json[0]).forEach(([key, value]) => {
        style = `
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #c0c0c0;
        color: white;
        text-align: center;
        font-weight: bold;
        text-shadow: 2px 2px 2px #626262;
        font-size: 18px;
        `;
        let th = document.createElement("th");
        th.setAttribute("style", style)
        th.append(key);
        firstTr.append(th);


    });
    if (edit) {

        let th = document.createElement("th");
        th.setAttribute("style", style)
        th.append('Edit');
        firstTr.append(th);
    }


    tBody.append(firstTr)
    table.append(tBody)

    json.forEach(element => {
        let tr2 = document.createElement("tr");
        Object.entries(element).forEach(([key, value]) => {
            // console.log(value)
            let td = document.createElement("td")
            td.setAttribute("style", styleTd)
            td.append(value)
            tr2.append(td);

        });
        if (edit) {
            let td2 = document.createElement("td")
            td2.setAttribute("style", styleTd)
            td2.append('Edit')
            td2.setAttribute("id", element.Name)

            td2.addEventListener("click", () => {
                openModal(element.Name)
            })
            tr2.append(td2);


        }
        tBody.append(tr2)
    });


    function openModal(text) {
        let div = Zc("div");
        let divStyle =
            `
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            `;
        div.setAttribute("style", divStyle);
        div.setAttribute("id", "myModal");
        let divModalStyle =
            `
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        `;
        let divModalContent = Zc("div");
        divModalContent.setAttribute("style", divModalStyle)
        let spanStyle =
            `
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        `;
        let spann = Zc("span");
        spann.setAttribute("style", spanStyle)
        spann.className = "close";
        spann.innerHTML = "&times;"
        let p = Zc("p");
        p.setAttribute("id", "someTextId")

        let style = Zc("style");
        let hover = `
        .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
        }
        `;
        style.append(hover)

        divModalContent.append(spann, p)
        div.append(divModalContent)
        document.body.append(div, style)


        // Get the modal
        var modal = document.getElementById("myModal");

        var span = document.getElementsByClassName("close")[0];
        let somT = document.getElementById("someTextId").textContent = text
        // When the user clicks the button, open the modal 

        modal.style.display = "block";


        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // div.append(table)
    document.body.append(table)


}