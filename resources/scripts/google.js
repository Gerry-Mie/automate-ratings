const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const getMonth = (d) => {
    if (
        d.includes('weeks ago')
        || d.includes('a month ago')
    ) return months[11]

    if (d.includes('2 months ago')) return months[10]
    if (d.includes('3 months ago')) return months[9]
    if (d.includes('4 months ago')) return months[8]
    if (d.includes('5 months ago')) return months[7]
    if (d.includes('6 months ago')) return months[6]
    if (d.includes('7 months ago')) return months[5]
    if (d.includes('8 months ago')) return months[4]
    if (d.includes('9 months ago')) return months[3]
    if (d.includes('10 months ago')) return months[2]
    if (d.includes('11 months ago')) return months[1]
    if (d.includes('a year ago')) return months[0]

    return null
}

const table = document.createElement('table')
const numberOfResult = document.createElement('p')
const generate = () => {

    table.replaceChildren()

    const readMore = document.getElementsByClassName('TJUuge')
    for (let i = 0; i < readMore.length; i++) {
        if (readMore[i].innerText.includes('Read more')) readMore[i].click()
    }

    var resultCount = 0
    const ratings = document.getElementsByClassName('Svr5cf')

    for (let i = 0; i < ratings.length; i++) {
        const date = ratings[i].getElementsByClassName('iUtr1')[0].innerText
        let comment = ratings[i].getElementsByClassName('K7oBsc')
        comment = comment?.length ? comment.length > 1 ? comment[1].innerText : comment[0].innerText : ''
        const rating = ratings[i].getElementsByClassName('GDWaad')[0].innerHTML[0] * 2

        const month = getMonth(date.trim().toLowerCase())
        if (!month) continue;

        const tr = document.createElement('tr')
        const tdMonth = document.createElement('td')
        const tdComment = document.createElement('td')
        const tdRating = document.createElement('td')

        tdMonth.innerText = month
        tdComment.innerText = comment
        tdRating.innerText = rating.toString()

        tdMonth.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 10px;")
        tdComment.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 10px;")
        tdRating.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 10px;")

        tr.appendChild(tdMonth)
        tr.appendChild(tdComment)
        tr.appendChild(tdRating)
        table.appendChild(tr)
        resultCount++
    }
    numberOfResult.innerText = 'number of result: ' + resultCount.toString()
}


const divPopup = document.createElement('div')
divPopup.appendChild(table)
divPopup.setAttribute('style', 'position: fixed; background-color: #fff; top: 0; left: 0; height: calc(100% - 120px); right: 0; z-index: 100; overflow-y: scroll; padding: 20px; border: 1px solid #000')
const parent = document.body
parent.appendChild(divPopup)

//common

const optContainer = document.createElement('div')
optContainer.setAttribute('style', 'position: fixed; overflow: hidden; left: 0; bottom: 0; width: 100vw; z-index: 1500; height: 60px; background-color: #5e545429; backdrop-filter: blur(4px); border: 1px solid #000; display:  flex; align-items: center; padding: 0 10px; gap: 10px;')

// toggle button
const toggleButton = document.createElement('button')
toggleButton.innerText = 'hide result'
toggleButton.addEventListener('click', function () {
    if (this.innerText === 'show result') {
        divPopup.style.display = 'block'
        this.innerText = 'hide result'
    } else {
        divPopup.style.display = 'none';
        this.innerText = 'show result'
    }
})
// generate btn
const generateBtn = document.createElement('button')
generateBtn.innerText = 're generate'
generateBtn.addEventListener('click', generate)

// minimize btn
const minimizeBtn = document.createElement('button')
minimizeBtn.innerText = '<'
minimizeBtn.addEventListener('click', function () {
    if (this.innerText === '<') {
        optContainer.style.width = '24px'
        this.innerText = '>'
    } else {
        optContainer.style.width = '100vw'
        this.innerText = '<'
    }
})

optContainer.appendChild(minimizeBtn)
optContainer.appendChild(toggleButton)
optContainer.appendChild(generateBtn)
optContainer.appendChild(numberOfResult)
parent.appendChild(optContainer)

setTimeout(generate, 500)
// generate()
