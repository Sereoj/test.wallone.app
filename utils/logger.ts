const isLogging = false;

export function logger(message: string | null | undefined)
{
    isLogging ? console.log(message) : null;
}
