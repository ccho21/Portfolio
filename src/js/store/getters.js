import Vue from 'vue';

export const charInit = (state) => {
    const message = state.message;
    let messageArr = message.split("");
    let animatedTitle = messageArr.map((cur, index) => {
        if (cur === ',') {
            messageArr[index + 1] = "line";
        }
        if (cur === 'line') {
            return {
                character: '',
                classes: ['d-block', 'charAnimation'],
                key: index,
            }
        }
        if (cur && cur === 'C' || index === 0) {
            return {
                character: cur,
                classes: ['orange', 'charAnimation'],
                key: index,
            }
        }
        return {
            character: cur,
            classes: ['charAnimation'],
            key: index,
        }
    });
    return animatedTitle;
};
