const Card = ({ children, bg = 'bg-white', style='' }) => {
  return <div className={`${bg} p-5 rounded-lg border border-gray-300 ${style}`}>{children}</div>;
};
export default Card;
