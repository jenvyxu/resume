import ScrollReveal from 'scrollreveal'

ScrollReveal().reveal('#siteWork,#skills', {
    delay: 400,
    useDelay: 'onload',
    distance: '100px',
    reset: true,
})
ScrollReveal().reveal('#comment', {
    delay: 400,
    useDelay: 'onload',
    distance: '100px',
})

ScrollReveal().reveal('.everyWork', {
    delay: 400,
    useDelay: 'onload',
    distance: '160px',
    scale: 0.6,
    reset: true,
})
ScrollReveal().reveal('.skillDescription>li,#radar canvas,main', {
    reset: true,
    useDelay: 'onload',
    interval: 400,
    scale: 0.8
})