export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-display text-neon-green mb-3 text-sm">AirChain</h4>
          <p className="text-muted-foreground">Blockchain-powered air quality monitoring for a cleaner future.</p>
        </div>
        <div>
          <h4 className="font-display text-neon-blue mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/" className="hover:text-neon-green transition-colors">Home</a></li>
            <li><a href="/dashboard" className="hover:text-neon-green transition-colors">Dashboard</a></li>
            <li><a href="/auth" className="hover:text-neon-green transition-colors">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-neon-blue mb-3 text-sm">Contact</h4>
          <p className="text-muted-foreground">info@airchain.io</p>
          <p className="text-muted-foreground mt-1">Built with ❤️ on the Blockchain</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-8">
        © 2026 AirChain. All rights reserved.
      </div>
    </footer>
  );
}
