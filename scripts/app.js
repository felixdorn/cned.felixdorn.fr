const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const loader = document.querySelector('.loading')
const container = document.getElementById('list')
const search = document.getElementById('search')

search.addEventListener('input', e => {
    container.classList.toggle('hidden')
    loader.classList.toggle('hidden')
    removeAllChildren(container)

    loadLinks(e.target.value)

})

const loadLinks = (search) => {
    fetch('/links.json').then(res => res.json()).then(links => {
        Object.keys(links).sort().filter(name => {
            const normalizedName = name.toLowerCase().replace(/[^a-zA-Z]+/g, '')
            const normalizedSearch = search.toLowerCase().replace(/[^a-zA-Z]+/g, '')

            return normalizedName.includes(normalizedSearch)
        }).forEach((name) => {
            const link = links[name]
            const el = document.createElement('div')

            el.innerHTML = `<a href="${link}" class="flex flex-col sm:flex-row justify-between items-start sm:items-stretch rounded-lg p-4 transition ease-in-out duration-150 bg-gray-800 border-t border-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 focus:outline-none">
                <div class="flex flex-col">
                    <p class="font-semibold select-none">${name}</p>
                    <p class="text-gray-400 hover:underline text-xs sm:text-base mt-1">${link}</p>
                </div>
                <button type="button"
                        class="mt-4 sm:mt-0 w-full sm:w-auto transition ease-in-out duration-150 bg-gradient-to-t from-purple-600 to-purple-500 px-6 py-2 rounded-lg font-semibold text-white hover:from-purple-400 hover:to-purple-500 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ring-offset-gray-700 focus:outline-none">
                    Continuer
                </button>
            </a>`

            container.appendChild(el)
        })

        loader.classList.toggle('hidden')
        container.classList.toggle('hidden')
    })
}

loadLinks(search.value)