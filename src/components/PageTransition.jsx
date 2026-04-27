export default function PageTransition({ children }) {
  return <div className="animate-[fadeIn_.25s_ease]" style={{ animation: 'fadeIn .25s ease' }}>{children}<style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style></div>;
}
