import "./index.css";

type HeaderProps = {
  subheaderText: string;
};

function Header({ subheaderText }: HeaderProps) {
  return (
    <header className="header">
      <h1>Super test form</h1>
      <h2>{subheaderText}</h2>
    </header>
  );
}

export default Header;
