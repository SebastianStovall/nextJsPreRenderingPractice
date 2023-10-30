// if you need to customize the HTML page itself, this file will allow you to do this

// the Head component here is not the same as the other Head imports
import Document, {Html, Head, Main, NextScript } from 'next/document'

// the return of this file must be a CLASS based react component
class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
