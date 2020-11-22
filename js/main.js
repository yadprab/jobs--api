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

  const navButton = document.querySelector('#navigation--button')







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


const fetchData = (val)=>{
 
    const endpoint =`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${val}`;


    fetch(endpoint).then(res=>res.json()).then(data=>{
     


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
                const time =(date)=>{

                    const d = new Date(date).toISOString();

                     const forMat = moment().format(d);
                     
                     
                     const dt = moment(forMat).fromNow()



                     return dt;




                }


                return `
                <li class='jobs--list list--animation ${jobs.type.slice(0,4)}${jobs.type.slice(5,9)}'>
                <section class="jobs">
                    <section class="img--section list--animation-3">
                        <img src="${jobs.company_logo}"
                        alt="">
                       </section>
                  
                       <section class="info">
                        <h2><span class="job-title list--animation-3" >${jobs.title}</span></h2>
                  
                  
                        
                        <span class="posted-time list--animation-3">${time(jobs.created_at)}</span>
                        <article>
                           
                            <h3 class="job-type list--animation-3">${jobs.type}</h3>
                            <h3 class="job-location list--animation-3">${jobs.location}</h3>
                           


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
            }, 1000))
            
        }

        
   











    })




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