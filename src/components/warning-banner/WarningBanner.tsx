const WarningBanner = ({ title, message }: PropsType) => {
  return (
    <div className="p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-300">
      <h2 className="font-bold mb-2">{title}</h2>
      {displayMessage(message)}
    </div>
  );
};

const displayMessage = (message: string) => {
  const texts = message.split('\\n');
  console.log(message);
  return (
    <p>
      {texts[0]}
      {texts.length > 1 &&
        texts.slice(1).map((text, idx) => (
          <span key={idx}>
            <br /> {text}
          </span>
        ))}
    </p>
  );
};

type PropsType = {
  title: string;
  message: string;
};

export default WarningBanner;
