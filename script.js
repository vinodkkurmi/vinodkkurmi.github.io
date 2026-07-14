const servers = {

    "GPU cards":[
        {mem:"141GB",users:["Tanmay"]},
        {mem:"141GB",users:["Akshay"]},
        {mem:"141GB",users:["Akash"]},
    ],
    
    "Prakriti":[
        {mem:"141GB",users:["Tanmay"]},
        {mem:"141GB",users:["Akash"]},
        {mem:"141GB",users:["Akash","Tanmay"]},
        {mem:"141GB",users:["Vivek"]},
        {mem:"141GB",users:["Vivek"]},
        {mem:"141GB",users:["Vivek","Pratibha"]},
        {mem:"141GB",users:["Pratibha"]},
        {mem:"141GB",users:["Pratibha"]},
    ],
    
    "Sankhya":[
        
        {mem:"141GB",users:["Vinod"]},
        {mem:"141GB",users:["Vinod","Akshay"]},
        {mem:"141GB",users:["Vinod","Akshay"]},
        {mem:"141GB",users:["Vaibhav","Samiran"]},
        {mem:"141GB",users:["Vaibhav"]},
        {mem:"141GB",users:["Samiran"]},
        {mem:"141GB",users:["Samiran"]},
        {mem:"141GB",users:["Sundaram"]},
    ],
    
    "Pragyan":[
        {mem:"80GB",users:["Sundaram"]},
        {mem:"80GB",users:["Sundaram"]},
        {mem:"40GB",users:["Sundaram"]},
    ],
    
    "Anusandhan":[
        {mem:"80GB",users:["Vaibhav"]},
        {mem:"80GB",users:["Vaibhav"]},
       
    ],
    
    "Medha":[
        {mem:"94GB",users:["Vinod"]}
    ],
    
    "Anveshan":[
        {mem:"94GB",users:["Akshay"]}
    ]
    
    };
    
    const dashboard=document.getElementById("dashboard");
    const select=document.getElementById("facultySelect");
    
    let faculty=new Set();
    
    Object.values(servers).forEach(server=>{
    
        server.forEach(gpu=>{
    
            gpu.users.forEach(name=>faculty.add(name));
    
        });
    
    });
    
    faculty=[...faculty].sort();
    
    faculty.forEach(name=>{
    
        let option=document.createElement("option");
    
        option.value=name;
    
        option.textContent=name;
    
        select.appendChild(option);
    
    });
    
    function draw(){
    
        dashboard.innerHTML="";
    
        let selected=select.value;
    
        for(let server in servers){
    
            let card=document.createElement("div");
    
            card.className="server";
    
            card.innerHTML="<h2>"+server+"</h2>";
    
            servers[server].forEach(gpu=>{
    
                let div=document.createElement("div");
    
                div.className="gpu";
    
                if(gpu.users.length>1)
                    div.classList.add("shared");
    
                if(selected!=""){
    
                    if(gpu.users.includes(selected))
                        div.classList.add("highlight");
                    else
                        div.classList.add("dim");
    
                }
    
                div.innerHTML=
                "<strong>"+gpu.mem+"</strong><small>"+gpu.users.join(" + ")+"</small>";
    
                card.appendChild(div);
    
            });
    
            dashboard.appendChild(card);
    
        }
    
    }
    
    draw();
    
    select.addEventListener("change",draw);