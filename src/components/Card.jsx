const Card = ({ children, bg = 'bg-white', style='' }) => {
  return <div className={`${bg} p-5 rounded-lg border border-gray-400 ${style}`}>{children}</div>;
};
export default Card;
