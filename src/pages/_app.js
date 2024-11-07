import "@/styles/globals.css";
import "@/styles/content.css";
import { Provider } from 'react-redux';
import store from "@/redux/store.js";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
       <Provider store={store}>
        <Component {...pageProps} />
      </Provider>   
    </SessionProvider>
  )
}
