const pushToTheBottom = (ref, withoutDelay) => {
    if (ref.current) {
        if (withoutDelay) {
            ref.current.scrollTop = ref.current.scrollHeight
        } else {
            setTimeout(() => {
                ref.current.scrollTop = ref.current.scrollHeight
            }, 0)
        }
    }
}

export default pushToTheBottom
