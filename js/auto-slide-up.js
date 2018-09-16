!function() {
    //添加offset类
    let specialTags=document.querySelectorAll('[data-x]')


    findClosestAndRemoveOffset()
    window.addEventListener('scroll',function(){
        findClosestAndRemoveOffset()
    })


    /*helper*/
    function findClosestAndRemoveOffset(){
        let specialTags=document.querySelectorAll('[data-x]')
        let minIndex=0
        for(let i=1;i<specialTags.length;i++){
            if(Math.abs(specialTags[i].offsetTop-window.scrollY)
                < Math.abs(specialTags[minIndex].offsetTop-window.scrollY)){
                minIndex=i
            }
        }

        let id=specialTags[minIndex].id
            let a=document.querySelector('a[href="#'+id+'"]')
            let li=a.parentNode
            let brotherAndMe=li.parentNode.children
            for(let i=0;i<brotherAndMe.length;i++){
                brotherAndMe[i].classList.remove('highlight')
            }
            li.classList.add('highlight')


    }
}.call()

