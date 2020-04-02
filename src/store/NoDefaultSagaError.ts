export class NoDefaultSagaError extends Error {
    constructor(filename: string, path: string) {
        const message = `Filename "${filename}" (components/${path
            .split(".")
            .join("/")}/${filename}) does not have default exported saga. The file in the ${path
            .split(".")
            .pop()} directory (components/${path}/__redux) should have export default <sagaName>.`;
        super(message);
        this.name = "NoDefaultSagaError";
    }
}
