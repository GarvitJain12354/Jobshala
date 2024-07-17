
import { Provider } from 'react-redux';
import './globals.css'
import { store } from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import 'remixicon/fonts/remixicon.css'
import Wrapper from '@/Components/wrapper/Wrapper';
export const metadata = {
  title : "Home"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>{children}</Wrapper>
       
        </body>
    </html>
  )
}
