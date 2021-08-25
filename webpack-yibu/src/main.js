const aBtn = document.getElementById('aBtn')
const bBtn = document.getElementById('bBtn')

aBtn.addEventListener('click', ()=> {
  import('./a').then((data)=> {
    console.log(data.default);
  })
})

bBtn.addEventListener('click', ()=> {
  import('./b').then((data)=> {
    console.log(data.b);
  })
})