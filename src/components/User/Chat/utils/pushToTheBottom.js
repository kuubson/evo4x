const pushToTheBottom = ref => {
    if (ref.current) {
        setTimeout(() => {
            ref.current.scrollTop = ref.current.scrollHeight
        }, 0)
    }
}

export default pushToTheBottom
