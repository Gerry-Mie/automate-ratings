const table = document.createElement('table')
table.style.maxHeight = 'calc(100% - 100px)'

const numberOfResult = document.createElement('p')

const validateDate = (date) => {
    const to  = new Date('January 1, 2023')
    const from = new Date('December 31, 2021')
    const commentDate = new Date(date)
    return commentDate > from && commentDate < to
}

const generate = () => {

    table.innerHTML = ''

    const ratings = document.getElementsByClassName('Review-comment')

    var resultCount = 0
    for (let i = 0; i < ratings.length; i++) {
        // date
        const date = ratings[i].getElementsByClassName('Review-statusBar-date')[0].innerText
        if (!validateDate(date)) continue;

        //comment
        let comment = ratings[i].getElementsByClassName('Review-comment-bodyText')
        comment = comment?.length ? comment[0].innerText : ''
        // rating
        const rating = ratings[i].getElementsByClassName('Review-comment-leftScore')[0].innerText


        const tr = document.createElement('tr')
        const tdMonth = document.createElement('td')
        const tdComment = document.createElement('td')
        const tdRating = document.createElement('td')

        tdMonth.innerText = date.replace('Reviewed', '').trim()
        tdComment.innerText = comment
        tdRating.innerText = rating.toString()

        tdMonth.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 12px;")
        tdComment.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 12px;")
        tdRating.setAttribute('style', "border: 1px solid black; font-family: Arial,serif; font-size: 12px;")

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
divPopup.setAttribute('style', 'position: fixed; background-color: #fff; top: 0; left: 0; height: calc(100% - 64px); right: 0; z-index: 6000; overflow-y: scroll; padding: 20px; border: 1px solid #000')
const parent = document.body
parent.appendChild(divPopup)

//common

const optContainer = document.createElement('div')
optContainer.setAttribute('style', 'position: fixed; left: 0; bottom: 0; right:0; z-index: 6500; height: 60px; background-color: #5e545429; backdrop-filter: blur(4px); border: 1px solid #000; display:  flex; align-items: center; padding: 0 15px; gap: 10px;')

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

optContainer.appendChild(toggleButton)
optContainer.appendChild(generateBtn)
optContainer.appendChild(numberOfResult)
parent.appendChild(optContainer)

generate()
