//job searchFn
const jobSearchFn = ()=>{
   //get form 
    const form = document.querySelector('form');

   //get label
   const label = document.querySelector('#toggle');
   

   //get input

   const input = document.querySelector('[type=search]');

   //get loader
   const loader = document.querySelectorAll('.loader');

   //get ul
   const ul = document.querySelector('.jobs--area');


    //get filter area
  const filterArea = document.querySelector('.filter--area');

  //get buttons

  const filterButtons = filterArea.querySelectorAll('button');

  const buttonArr = [...filterButtons];

  //get nav button

  const navButton = document.querySelector('#navigation--button');


  const container = document.querySelector('.container');

    const inputArea = document.querySelector('.input--area');







const submitFn = (e)=>{
    e.preventDefault();
   
    const value = input.value;
     
   if (value.trim()=='') {
       
    window.alert('enter the job description')
       
   } else {
    loader.forEach(list=>list.classList.remove('hide'));

    setTimeout(()=>{
        loader.forEach(list=>list.classList.add('hide'));

    },2000)

    fetchData(value);
       
   }

    form.reset();

    

    
}
 const time =(date)=>{

                    const d = new Date(date).toISOString();

                     const forMat = moment().format(d);
                     
                     
                     const dt = moment(forMat).fromNow()



                     return dt;




                }


const fetchData = (val)=>{
 
    const endpoint =`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${val}`;


    fetch(endpoint).then(res=>res.json()).then(data=>{
     
          const dataArr = [...data];
          console.log(dataArr);

        if (data== null|| data.length == 0) {

           
          
            ul.innerHTML = `

            <li>
            <section class="not--found">
                <h2>not found try later</h2>

            </section>
        </li>

            
            
            
            
            
            
            
            
            `
            
        } else {
 
            
         

            ul.innerHTML = data.map(jobs=>{
               


                return `
                <li class='jobs--list list--animation ${jobs.type.slice(0,4)}${jobs.type.slice(5,9)}'>
                <section class="jobs">
                    <section class="img--section list--animation-2">
                        <img src="${jobs.company_logo}"
                        alt="">
                       </section>
                  
                       <section class="info">
                        <h2><span class="job-title list--animation-3"  >${jobs.title}</span></h2>
                  
                  
                        
                        <span class="posted-time list--animation-3" >${time(jobs.created_at)}</span>
                        <article>
                           
                            <h3 class="job-type list--animation-3">${jobs.type}</h3>
                            <h3 class="job-location list--animation-3" >${jobs.location}</h3>
                           


                        </article>
                       </section>
                   

                </section>
            </li>
            
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                `








            }).join('');


            const jobsList = ul.querySelectorAll('.jobs--list');
            
            jobsList.forEach(jobs=>setTimeout(()=>{
                jobs.classList.remove('list--animation');
                jobs.classList.add('hover--state')
            }, 1000));


            jobsList.forEach((li, index)=>li.addEventListener('click', (e)=>{
                 e.stopPropagation();
                 const target = dataArr[index];
                  
                  descriptionFn(target)

            }, {
                capture: true,
            }))
            
        }

        
   











    })




}
const descriptionFn =(obj)=>{

    if (obj.length == 0 || obj=== null) {
        return;
        
    }

    const dataObj = obj;
    console.log(JSON.stringify(dataObj.description.replace(/\n/g, '')));
     const main = document.querySelector('main');

     main.classList.add('over');

     inputArea.style.display = 'none';


     container.innerHTML = `
     <section class="selected--job">
                <section class="job--intro">
                    <section class="job--img--section">
                        <img src="${dataObj.company_logo}" alt="logo">

                    </section>

                    <section class="job--info--section">
                        <h2>${dataObj.company}<span>site</span></h2>
                        
                         
                        <a href="${dataObj.company_url}" target="_blank" rel="noopener noreferrer">company site</a>
                         
                      
                    </section>

                </section>
                
            <section class="jobs--overview">
                 <section class="job--description">

                  <section>
                      <h3 id="time">${time(dataObj.created_at)}<span></span>.<span>${dataObj.type}</span></h3>
                <h3 class="job--des--name">${dataObj.title}</h3>
                <h3 id="job--location--detail">${dataObj.location}</h3>
                  </section>

                <a href="${dataObj.url}" target="_blank" rel="noopener noreferrer">apply now</a>




            </section>


            <article class="content--desc">
                   ${dataObj.description.replace(/\n/g, '')}
           </article>
        </section>
             <article class="how--to--apply">
                 <h3>how to apply</h3>
                     ${dataObj.how_to_apply.replace(/\n/g, '')}

            </article>

        </section> 

              
                
     

        </section>
    

        
       <section class="footer--overlay">
        <section class="details">
              <h3>${dataObj.title}</h3>
        <span>${dataObj.company}</span>
        </section>
                         
     <a href="${dataObj.url}" target="_blank" rel="noopener noreferrer">apply</a>


    </section>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     `



// const contentDesc = document.querySelectorAll('p');

// console.log(contentDesc);
inter();
  


}

const inter = ()=>{
  const target = document.querySelector('.how--to--apply');
  
  
  const foot = document.querySelector('.footer--overlay');
  
  if (foot=== null||target===null) {
    return;
    
  }
let observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        foot.style.display = "none"
        
      }else{
         foot.style.display = "grid"
        
      }
    })
});
  

observer.observe(target);
  

  
  
  

    
    
  }
  
  

const filterFn =(e)=>{

    e.preventDefault();

    const target = e.target;

    buttonArr.forEach(button=> button.classList.remove('button--active'))
   
    target.classList.add('button--active');
  
   
    const attr = target.getAttribute('data-value');


    const li = ul.querySelectorAll('.jobs--list');



    const jobsArr = [...li];
    
    
    if (jobsArr==null|| jobsArr.length ==0){
        
        return;
        
    }

    



switch (attr) {
    case 'fulltime':
      jobsArr.filter(jobs=>{jobs.classList.contains('FullTime')?jobs.style.display = 'grid': jobs.style.display='none'});
          
        break;

        case 'parttime':
            jobsArr.filter(jobs=>{jobs.classList.contains('PartTime')?jobs.style.display = 'grid': jobs.style.display='none'});
            
            break;

    default: 'All'
      jobsArr.forEach(jobs=>jobs.style.display = 'grid')
        break;
}
   








    
}

 const theme =(e)=>{

    e.preventDefault();

   
     
    
         const themeProp ={
    
            theme:'',
            state:'',
         }



if (document.body.className == 'light') {

    document.body.className = 'dark';

    label.className = 'toggle--move';

    themeProp.theme =document.body.className;


    themeProp.state =label.className;


    localStorage.setItem('theme', JSON.stringify(themeProp));



    
} else {
    document.body.className = 'light';

    label.className = '';

    themeProp.theme = document.body.className;

    themeProp.state =label.className;

    localStorage.setItem('theme', JSON.stringify(themeProp));
    
}
      
     
         
     
     
  }
     
    
     
const setTheme =()=>{


    if (localStorage.getItem('theme')== null) {

        return;
        
    } else {
        const currentTheme = JSON.parse(localStorage.getItem('theme'));

        const {theme, state} = currentTheme;

        document.body.className = theme;

           label.className = state;

        
    }
}

 





const navFn = (e)=>{

e.preventDefault();

//get mobile nav

const mobileNav = document.querySelector('.mobile--nav');


mobileNav.classList.remove('hide')

setTimeout(()=>{
    mobileNav.classList.add('show');
},500);


const closeButton = mobileNav.querySelector('#close--button');



const closeFn =(e)=>{
    e.preventDefault();

    
mobileNav.classList.add('hide')


}


closeButton.addEventListener('click', closeFn);

     


}






 





setTheme();


filterButtons.forEach(tab=>tab.addEventListener('click',filterFn));

form.addEventListener('submit', submitFn);

navButton.addEventListener('click', navFn);

 //click event for label
  label.addEventListener('click', theme);



}














window.addEventListener('DOMContentLoaded', jobSearchFn);