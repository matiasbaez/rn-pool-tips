
export const loadState = () => {
    try {
        const data = localStorage.getItem('state');
        if (data === null) return undefined;
        
        return JSON.parse(data);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state))
    } catch (err) {

    }
}