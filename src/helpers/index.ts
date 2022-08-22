export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase();
}
