const debounce = (callback: Function, wait = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    console.log("2")

    return function debouncer(this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), wait);
    };
};

export default debounce