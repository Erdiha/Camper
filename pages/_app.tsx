import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
} from 'recoil';
import { AuthProvider } from '../data/authservice';
import { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    //state control with recoil
    <RecoilRoot>
      {/* authentication global wrapping to prevent accesing pages without account */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
