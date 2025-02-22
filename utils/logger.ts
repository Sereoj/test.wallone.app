export class Logger {
    private static isLoggingEnabled = true
    private static logToFile = false
    private static logServerUrl = ''

    private static getCallerInfo(): string {
        const stack = new Error().stack || ''
        const stackLines = stack.split('\n')
        const callerLine = stackLines[3] || stackLines[2] || 'Unknown'
        const match = callerLine.match(/\((.*):(\d+):(\d+)\)/)

        if (match) {
            const [, file, line, column] = match
            return `${file}:${line}:${column}`
        }
        return 'Unknown location'
    }

    private static logMessage(
        type: 'error' | 'warn' | 'info' | 'debug' | 'trace',
        message: any,
        meta?: any
    ) {
        if (!this.isLoggingEnabled) return

        const callerInfo = this.getCallerInfo()
        const timestamp = new Date().toISOString()
        const logType = type.toUpperCase()

        const colors = {
            error: '\x1b[31m', // Красный
            warn: '\x1b[33m', // Желтый
            info: '\x1b[36m', // Голубой
            debug: '\x1b[35m', // Фиолетовый
            trace: '\x1b[90m' // Серый
        }
        const color = colors[type] || '\x1b[0m'

        console.log(
            `${color}[${logType}] ${timestamp} [${callerInfo}]:\x1b[0m`,
            message,
            meta ? `\n📝 Meta: ${JSON.stringify(meta, null, 2)}` : ''
        )

        if (this.logServerUrl) {
            fetch(this.logServerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, timestamp, callerInfo, message, meta })
            }).catch(() => {})
        }
    }

    static error(message: any, meta?: any) {
        this.logMessage('error', message, meta)
    }

    static warn(message: any, meta?: any) {
        this.logMessage('warn', message, meta)
    }

    static info(message: any, meta?: any) {
        this.logMessage('info', message, meta)
    }

    static debug(message: any, meta?: any) {
        this.logMessage('debug', message, meta)
    }

    static trace(message: any, meta?: any) {
        this.logMessage('trace', message, meta)
    }

    static enableLogging(enabled: boolean) {
        this.isLoggingEnabled = enabled
    }

    static setupGlobalErrorHandler() {
        window.onerror = (message, source, lineno, colno, error) => {
            this.error('Unhandled Error', { message, source, lineno, colno, error })
        }

        window.addEventListener('unhandledrejection', (event) => {
            this.error('Unhandled Promise Rejection', { reason: event.reason })
        })
    }
}
