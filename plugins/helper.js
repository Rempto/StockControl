export default ({ app }, inject) => {
    inject('convertToQueryString', (obj) => {
        const str = []
        for (const p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        return str.join('&')
    })
}