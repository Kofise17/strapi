import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';


 function NavigationBar() {
  return (
    <nav>
      <ul style={{display:'flex', flexDirection:'row', justifyContent:"space-around", alignItems:"flex-end", listStyleType:"none"}}>
        <li><Link href="/" style={{textDecoration:"none", color:"black"}}>Home</Link></li>
        <li><Link href="/blogs" style={{textDecoration:"none", color:"black"}}>Blogs</Link></li>
        <li><Link href="/biografie" style={{textDecoration:"none", color:"black"}}>Biografie</Link></li>
        <li><Link href="/discografie" style={{textDecoration:"none", color:"black"}}>Discografie</Link></li>
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
