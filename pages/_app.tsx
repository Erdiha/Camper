import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
function MyApp({ Component, pageProps }: any) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
