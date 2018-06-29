
export const snip = (text: string, length: number) => {
    return text.length > length
        ? text.substring(0, length)
        : text;
}


// export const stringHelper = new StringHelper();