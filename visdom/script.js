// =============================
// GPU Allocation Data
// =============================

const groups = [

    {
        server: "VisDom",
        allocations: [
            { name: "Parinita", mem: "80GB", color: "#ffd6d6" }
        ]
    },
    
    {
        server: "Dhruv",
        allocations: [
            { name: "Kunal", mem: "60GB", color: "#fff3c2" },
            { name: "Shivangi", mem: "60GB", color: "#dcefd5" },
            { name: "Rini", mem: "20GB", color: "#fff3c2" }
        ]
    },
    
    {
        server: "Medha",
        allocations: [
            { name: "Rini", mem: "45GB", color: "#ffe7bf" },
            { name: "Rajeev", mem: "45GB", color: "#e7dcf2" }
        ]
    },
    
    {
        server: "Sankhya",
        allocations: [
            { name: "Akanksha", mem: "35GB", color: "#3498db" },
            { name: "Akanksha", mem: "35GB", color: "#3498db" },
            { name: "Ayush", mem: "35GB", color: "#b00030" },
            { name: "Ayush", mem: "35GB", color: "#b00030" }
        ]
    },
    
    {
        server: "Drishti (GPU Card)",
        allocations: [
            { name: "Akanksha", mem: "32GB", color: "#3498db" }
        ]
    },
    
    {
        server: "Prabodh (GPU Card)",
        allocations: [
            { name: "Rajeev", mem: "16GB", color: "#e7dcf2" }
        ]
    }
    
    ];
    
    
    // =============================
    // Build User List
    // =============================
    
    const users = [...new Set(
        groups.flatMap(g => g.allocations.map(a => a.name))
    )].sort();
    
    const select = document.getElementById("userSelect");
    const container = document.getElementById("container");
    const summary = document.getElementById("summary");
    
    users.forEach(user => {
    
        let option = document.createElement("option");
    
        option.value = user;
        option.textContent = user;
    
        select.appendChild(option);
    
    });
    
    
    // =============================
    // Draw Dashboard
    // =============================
    
    function draw() {
    
        container.innerHTML = "";
    
        const selected = select.value;
    
        let totalMemory = 0;
        let totalBlocks = 0;
        let serverList = [];
    
        groups.forEach(server => {
    
            let card = document.createElement("div");
            card.className = "group";
    
            let title = document.createElement("h3");
            title.innerHTML = server.server;
            title.style.textAlign = "center";
            title.style.marginBottom = "12px";
    
            card.appendChild(title);
    
            let found = false;
    
            server.allocations.forEach(item => {
    
                let block = document.createElement("div");
    
                block.className = "block";
    
                block.style.background = item.color;
    
                if(item.color=="#3498db" || item.color=="#b00030")
                    block.style.color="white";
    
                block.innerHTML =
                    "<strong>"+item.name+"</strong><br>"+item.mem;
    
                if(selected!=""){
    
                    if(item.name===selected){
    
                        block.classList.add("highlight");
    
                        totalMemory += parseInt(item.mem);
    
                        totalBlocks++;
    
                        found = true;
    
                    }
                    else{
    
                        block.classList.add("dim");
    
                    }
    
                }
    
                card.appendChild(block);
    
            });
    
            if(found)
                serverList.push(server.server);
    
            container.appendChild(card);
    
        });
    
        if(selected===""){
    
            summary.style.display="none";
    
            return;
    
        }
    
        summary.style.display="block";
    
        summary.innerHTML =
    
        `
        <h2>${selected}</h2>
    
        <hr>
    
        <p><b>Total Memory :</b> ${totalMemory} GB</p>
    
        <p><b>Total GPU Blocks :</b> ${totalBlocks}</p>
    
        <p><b>Allocated On :</b> ${serverList.join(", ")}</p>
        `;
    
    }
    
    
    // =============================
    
    draw();
    
    select.addEventListener("change",draw);