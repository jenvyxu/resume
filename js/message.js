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
        save:function(name,content){
            let Message = AV.Object.extend('Message');
            let message= new Message();
            return message.save({  //promise对象
                'name':name,
                'content': content
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
            this.form=view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages:function(){
            var query = new AV.Query('Message');
            this.model.fetch().then(
                    (messages)=>{
                        let array=messages.map((item)=>item.attributes)
                        array.forEach((item)=>{
                            let li=document.createElement('li')
                            li.innerText=`${item.name}:${item.content}`
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
            let content=myform.querySelector('input[name=content]').value
            let name=myform.querySelector('input[name=name]').value
            this.model.save(name,content).then(function(object) {
                let li=document.createElement('li')
                li.innerText=`${object.attributes.name}:${object.attributes.content}`
                let messageList=document.querySelector('#messageList')
                messageList.appendChild(li)
                myform.querySelector('input[name=content]').value=''
            })
        },
    }
controller.init(view,model)
}.call()















