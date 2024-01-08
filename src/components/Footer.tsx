const footerLinks = [
  "About",
  "Download the X app",
  "Help Center",
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "Blog",
  "Status",
  "Careers",
  "Brand Resources",
  "Advertising",
  "Marketing",
  "X for Business",
  "Developers",
  "Directory",
  "Settings",
  "© 2023 X Corp.",
];

export const Footer = () => {
  return (
    <div>
      <nav>
        <ul className="flex flex-wrap justify-center gap-2 px-4 py-3 text-sm text-label">
          {footerLinks.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
