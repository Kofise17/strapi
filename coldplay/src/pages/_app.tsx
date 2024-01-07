import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';


 function NavigationBar() {
  return (
    <nav style={{background:"linear-gradient(to right, #00aaff, #ffeb3b)", padding:"10px"}}>
      <ul style={{display:'flex', flexDirection:'row', justifyContent:"space-around", alignItems:"flex-end", listStyleType:"none"}}>
        <li><Link href="/" style={{textDecoration:"none", color:"white"}}><b>Home</b></Link></li>
        <li><Link href="/blogs" style={{textDecoration:"none", color:"white"}}><b>Blogs</b></Link></li>
        <li><Link href="/biografie" style={{textDecoration:"none", color:"white"}}><b>Biography</b></Link></li>
        <li><Link href="/discografie" style={{textDecoration:"none", color:"white"}}><b>Discography</b></Link></li>
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
