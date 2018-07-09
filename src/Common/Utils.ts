
export const snip = (text: string, length: number) => {
    return text.length > length
        ? text.substring(0, length)
        : text;
}

export const randomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const avatarUrl = (name: string) => {
    // TODO: ${randomHexColor()} not random, but custom color plz
    return `https://ui-avatars.com/api/?background=336699&color=fff&size=32&name=${name}`;
}