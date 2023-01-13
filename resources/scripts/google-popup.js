const readMore = document.getElementsByClassName('review-more-link')
for (let i = 0; i < readMore.length; i++) {
    readMore[i].click()
}

const sRate = document.getElementsByClassName('k8MTF')
for (let i = 0; i < sRate.length; i++) {
    sRate[i].style.visibility = 'hidden'
}

setTimeout(() => {

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

    const ratings = document.getElementsByClassName('WMbnJf')

    const table = document.createElement('table')

    for (let i = 0; i < ratings.length; i++) {
        const date = ratings[i].getElementsByClassName('Qhbkge')[0].innerText
        let comment = ratings[i].getElementsByClassName('Jtu6Td')
        comment = comment?.length ? comment.length > 1 ? comment[1].innerText : comment[0].innerText : ''
        const rating = ratings[i].getElementsByClassName('pjemBf')[0].innerHTML[0] * 2

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
    }

    const divPopup = document.createElement('div')
    const toggleButton = document.createElement('button')
    toggleButton.innerText = 'toggle'

    divPopup.appendChild(toggleButton)
    divPopup.appendChild(table)
    divPopup.setAttribute('style', 'color: #000; position: absolute; background-color: #9abbb0; top: 0; left: 0; height:95vh; right: 0; z-index: 1000; overflow-y: scroll; padding: 10px;')
    const parent = document.body
    parent.appendChild(divPopup)

    let hidden = false
    toggleButton.addEventListener('click', () => {
        if (hidden) {
            divPopup.style.height = '95vh'
            hidden = false
        } else {
            divPopup.style.height = '30px';
            hidden = true
        }
    })

}, 1000)