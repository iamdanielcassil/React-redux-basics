export const debug = {
    log: (...args) => {
        if (window.DC.debug) {
            console.log(...args)
        }
    }
}