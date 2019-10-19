import 'css/top-nav-bar.css'

{
    let view = document.querySelector('#topNavBar')
    let controller = {
        view: null,
        init(view) {
            this.view = view //把view存进来
            this.bindEvents() //this.bindEvents.call(this)
        },
        bindEvents() {
            let view = this.view
            window.addEventListener('scroll', () => {
                    if (window.scrollY > 0) {
                        this.active()
                    } else {
                        this.deactive()
                    }
                }) //箭头函数没有this,箭头函数内外this一样
        },
        active() {
            this.view.classList.add('sticky')
        },
        deactive() {
            view.classList.remove('sticky')
        }
    }
    controller.init(view)
        //controller.init.call(controller,view)
}