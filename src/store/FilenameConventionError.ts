export class FilenameConventionError extends Error {
    constructor(filename: string, path: string, postfix: string) {
        const message = `Filename "${filename}" (components/${path
            .split(".")
            .join("/")}/${filename}) does not match the naming convention. The file in the ${path
            .split(".")
            .pop()} directory (components/${path}/__redux) should begin with the directory name (${path
            .split(".")
            .pop()}). Rename file To "${path.split(".").pop()}.${postfix}.tsx".`;
        super(message);
        this.name = "FilenameConventionError";
    }
}
