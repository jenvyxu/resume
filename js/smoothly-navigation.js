!function(){
    var view=document.querySelector('nav.menu')
    var controller={
        view:null,
        aTags:null,
        liTags:null,
        init:function(view){
            this.view=view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation:function(){
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate)
        },
        scrollToElement:function(element){
            let top=element[0].offsetTop  //element[0]才是一个div
            let currentTop=window.scrollY
            let targetTop=top-80
            let s=targetTop-currentTop
            let t=Math.abs((s/100)*300)
            if(t>500){t=500}
            let coords = {y: currentTop }
            let tween = new TWEEN.Tween(coords)
                .to({y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function() {
                    window.scrollTo(0,coords.y)
                })
                .start();
        },

        bindEvents:function(){
            let aTags=view.querySelectorAll('nav.menu > ul > li > a')
            let liTags=view.querySelectorAll('nav.menu>ul>li')
            for(let i=0;i<aTags.length;i++){
                aTags[i].onclick=(x)=>{
                    x.preventDefault()
                    let a=x.currentTarget;
                    let href=a.getAttribute('href')
                    let element=document.querySelectorAll(href)
                    this.scrollToElement(element)
                }
            }
            for(let i=0;i<liTags.length;i++){
                liTags[i].onmouseenter=function(x){
                    x.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave=function(x){
                    x.currentTarget.classList.remove('active')
                }
            }
        },
    }
    controller.init(view)
}.call()

