const ul = document.querySelector("ul")

async function getData(){
        const res = await fetch("./data.json");
        if(!res.ok){
            console.log('Oops! Something went wrong');
            return null;
        }
    
        const data = await res.json();
        return data;
}

async function renderData(timeFrame = "weekly"){
   const data = await getData()
   timeFrame = timeFrame
   document.querySelector("main").innerHTML = ''

   data.forEach(element => {
    //console.log(element.timeframes[timeFrame].current)
    let habit = element.title.toLowerCase()
    console.log(element.timeframes[timeFrame])
    const previousHours = element.timeframes[timeFrame].previous

        let html = `
        <section class="health_habits" style="background-color:${element.backgroundColor}">  
        <!-- the image becomes dynamic -->
        <img class="habit_image" src="./images/icon-${habit}.svg" alt=${habit}>  

        <article class="habit_info">
        <article class="habit_cards card_top">
            <h2>${element.title} </h2>
            <img class="text_ellipsis" src="./images/icon-ellipsis.svg" alt="">
        </article>
        <article class="habit_cards">
            <p class="current_hours">${element.timeframes[timeFrame].current} hrs</p>
            <p class="previous_hours"> Last Week - ${element.timeframes[timeFrame].previous} hrs</p><!-- weekly -->
        </article>
        </section>

        `
    
        document.querySelector("main").innerHTML += html
   
   });
}



async function setTimeFrame(e){
    console.log(e)
    let time = e.target.id
    if(e.target.tagName === "UL" ){
        return null
     } 
    changeActiveTime(e)
    renderData(time)
}

async function changeActiveTime(e){
        const listItems = [...ul.children]
        listItems.forEach(item => {
            if(item.classList.contains("active")){
            item.classList.remove("active")
           }
        })
    
        if(!e.target.classList.contains("active")){
            e.target.classList.add("active")
        }
    
}






ul.addEventListener("click", setTimeFrame)

renderData()


