import 'css/skills.css'
import echarts from 'echarts'

{
    let view = document.getElementById('radar')
    let controller = {
        init(view) {
            let myChart = echarts.init(view)
            let option = {
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#ffffff',
                            backgroundColor: '#e6686a',
                            borderRadius: 4,
                            padding: [4, 8, 4, 8],
                        }
                    },
                    indicator: [
                        { name: 'Javascript', max: 100 },
                        { name: 'HTML', max: 100 },
                        { name: 'CSS3', max: 100 },
                        { name: 'Vue', max: 100 },
                        { name: 'Webpack', max: 100 },
                        { name: 'jQuery', max: 100 },
                        { name: '移动端开发', max: 100 },
                        { name: 'ES6', max: 100 },
                    ]
                },
                series: [{
                    name: '',
                    type: 'radar',
                    data: [{
                        value: [88, 78, 85, 82, 75, 85, 80, 80],
                    }, ]
                }]
            }
            myChart.setOption(option)
        }
    }
    controller.init(view)
}