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

            el.innerHTML = `<a href="${link}" class="bg-gray-800  p-4 rounded-lg border border-gray-700 flex justify-between">
                <div class="flex flex-col">
                    <p class="font-semibold">${name}</p>
                    <p class="text-gray-400 hover:underline">${link}</p>
                </div>
                <button type="button"
                        class="transition ease-in-out duration-150 bg-gradient-to-t from-purple-500 to-purple-400 px-6 py-2 rounded-lg shadow font-semibold text-white hover:from-purple-400 hover:to-purple-500 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
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