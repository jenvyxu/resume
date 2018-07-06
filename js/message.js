!function(){
    var view=document.querySelector('section.message')
    var model={
        init:function(){
            //初始化
            var APP_ID = 'kWX04xXxgbiqWffzrmQpEXtm-gzGzoHsz'
            var APP_KEY = 'f4OPrfiv5wlmJBR3jkMphia4'
            AV.init({appId: APP_ID, appKey: APP_KEY})
        },
        //获取数据
        fetch:function(){  //promise对象
            var query = new AV.Query('Message');
            return query.find()
        },
        //创建数据并保存
        save:function(name,content,time){
            let Message = AV.Object.extend('Message');
            let message= new Message();
            return message.save({  //promise对象
                'name':name,
                'content': content,
                'time':time
            })
        }
    }
    var controller={
        view:null,
        model:null,
        messageList:null,
        form:null,
        init:function(view,model){
            this.view=view
            this.model=model
            this.messageList=view.querySelector('#messageList')
            console.log(this.messageList)
            this.form=view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages:function(){
            var query = new AV.Query('Message');
            this.model.fetch().then(
                    (messages)=>{
                        console.log(messages)
                        let array=messages.map((item)=>item.attributes)
                        console.log(array
                    )
                        array.forEach((item)=>{
                            let li=document.createElement('li')
                            let string=` 
                                <div id="guest"><img src="./img/guest.jpg" alt=""></div>
                                     <div class="nameAndMessage">
                                            <div class="nameAndTime">
                                            <div class="name">${item.name}</div>
                                    <div class="time">${item.time}</div>
                                    </div>
                                    <div class="inner-message">${item.content}
                                </div>
                            </div>`
                            li.innerHTML=string
                            this.messageList.appendChild(li)
                        })

                    })
        },
        bindEvents:function(){
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage:function(){
            let myform=this.form
            let content=myform.querySelector('textarea[name=content]').value
            let name=myform.querySelector('input[name=name]').value
            let myDate=new Date()
            let month=Number(myDate.getMonth())+1
            let time=month+'/'+myDate.getDate()+'/'+myDate.getFullYear()+' ' +myDate.toString().substring(15,24)
            this.model.save(name,content,time).then(
                function(object) {
                let div=document.createElement('div')
                let messageList=document.querySelector('#messageList')
                let string=`  
                   <div id="guest"><img src="./img/guest.jpg" alt=""></div>
                <div class="nameAndMessage">
                    <div class="nameAndTime">
                        <div class="name">${object.attributes.name}</div>
                        <div class="time">${time}</div>
                    </div>
                    <div class="inner-message">${object.attributes.content}
                    </div>
                </div>`
                let li=document.createElement('li')
                li.innerHTML=string
                messageList.appendChild(li)
                myform.querySelector('input[name=content]').value=''
            })
        },
    }
controller.init(view,model)
}.call()















