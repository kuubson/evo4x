const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

const getCookie = (cookiesString, cookieName) => {
    const cookies = `; ${cookiesString}`
    return cookies.split(`; ${cookieName}=`).pop().split(';').shift()
}

const cookie = {
    maxAge,
    getCookie
}

export default cookie
