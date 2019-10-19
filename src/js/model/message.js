import AV from 'leancloud-storage'

{
    let { Query, User } = AV;
    let view = document.querySelector('section.message')
    let model = {
        init() {
            //初始化
            let APP_ID = 'kWX04xXxgbiqWffzrmQpEXtm-gzGzoHsz'
            let APP_KEY = 'f4OPrfiv5wlmJBR3jkMphia4'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        //获取数据
        fetch() { //promise对象
            let query = new AV.Query('Message');
            return query.find()
        },
        //创建数据并保存
        save(name, content, time) {
            let Message = AV.Object.extend('Message');
            let message = new Message();
            return message.save({ //promise对象
                'name': name,
                'content': content,
                'time': time
            })
        }
    }
    let controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init(view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('.messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
            this.countMessageLength()
        },

        loadMessages() {
            let query = new AV.Query('Message');
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes).reverse()
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        let string = ` 
                            <div class="name">${item.name}</div>
                            <div class="inner-message">${item.content}</div>
                            <div class="time">${item.time}</div>`
                        li.innerHTML = string
                        li.classList.add('nameAndMessage')
                        this.messageList.appendChild(li)
                    })

                })
        },
        bindEvents() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        countMessageLength() {
            let num = 233
            let msg = this.view.querySelector('.content')
            let btn = this.view.querySelector('.submit-btn')
            this.view.querySelector('.count').innerText = 233
            msg.addEventListener('input', () => {
                if (msg.value.length === 0) {
                    btn.setAttribute('disabled', 'true')
                } else {
                    btn.removeAttribute('disabled')
                }
                this.view.querySelector('.count').innerText = num - msg.value.length
            })
        },
        saveMessage() {
            let myform = this.form
            let content = myform.querySelector('textarea[name=content]').value
            let name = myform.querySelector('input[name=name]').value ? myform.querySelector('input[name=name]').value : '匿名'
            let myDate = new Date()
            let month = Number(myDate.getMonth()) + 1
            let time = month + '-' + myDate.getDate() + '-' + myDate.getFullYear() + ' ' + myDate.toString().substring(15, 21)
            this.model.save(name, content, time).then(
                function(object) {
                    let div = document.createElement('div')
                    let messageList = document.querySelector('.messageList')
                    let string = `                      
                        <div class="name">${object.attributes.name}</div>
                        <div class="inner-message">${object.attributes.content}</div>
                        <div class="time">${time}</div>`

                    let li = document.createElement('li')
                    li.classList.add('nameAndMessage')
                    li.innerHTML = string
                    messageList.prepend(li)
                    myform.querySelector('.messageForm input[name=name]').value = ''
                    myform.querySelector('.messageForm textarea[name=content]').value = ''

                })
        },
    }
    controller.init(view, model)

}