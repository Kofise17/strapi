import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';


 function NavigationBar() {
  return (
    <nav>
      <ul style={{display:'flex', flexDirection:'row', justifyContent:"space-around", alignItems:"flex-end"}}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blogs">Blogs</Link></li>
        <li><Link href="/biografie">Biografie</Link></li>
        <li><Link href="/discografie">Discografie</Link></li>
      </ul>
    </nav>
  );
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
    </>
  );
}
