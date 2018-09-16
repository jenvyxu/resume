var myChart = echarts.init(document.getElementById('radar'));
var option = {
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#ffffff',
                backgroundColor: '#e6686a',
                borderRadius: 3,
                padding: [5, 5]
            }
        },
        indicator: [
            { name: 'Javascript', max: 100},
            { name: 'HTML & CSS3', max: 100},
            { name: 'Vue', max: 100},
            { name: 'Webpack', max: 100},
            { name: 'jQuery', max: 100},
            { name: '移动端开发', max: 100},
            { name: 'ES6', max: 100},
            { name: 'Bootstrap', max: 100}
        ]
    },
    series: [{
        name: '',
        type: 'radar',
        data : [
            {
                value : [70, 85, 80, 60, 70, 75, 60, 65],
            },
        ]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
