import './globals.css';

export const metadata = {
  title: 'AyanMart E-Commerce',
  description: 'Full stack e-commerce platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <b>AyanMart</b>
          <div>
            <a href="/">Store</a>
            <a href="/cart">Cart</a>
            <a href="/orders">Orders</a>
            <a href="/admin">Admin</a>
            <a href="/login">Login</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
