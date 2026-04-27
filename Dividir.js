export function Division(a, b) {
    if(b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
}