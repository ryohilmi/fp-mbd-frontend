export default function Card({ blue, children }) {
  return <div className={`card ${blue && "blueBg"}`}>{children}</div>;
}
