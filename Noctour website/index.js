function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


addEventListener('scroll',e=>{

    if(isInViewport(document.querySelector('.heading-primary-main')) && window.scrollY==0){
        console.log('haj')
        document.querySelector('.heading-primary-main').style.animation = 'moveInLeft 5s ease-in';
        document.querySelector('.heading-primary-sub').style.animation = 'moveInRight 5s ease-in';
        document.querySelector('.logo').style.animation = 'moveInLeft 5s ease-in';
     
       
    }else{
      
        document.querySelector('.heading-primary-main').style.animation = 'none';
        document.querySelector('.heading-primary-sub').style.animation = 'none';
        document.querySelector('.logo').style.animation = 'none';
    }
})