import "./index.css";

interface ReviewProps {
  username: string;
  email: string;
  phone: string;
  country: string;
}

function Review({ username, email, phone, country }: ReviewProps) {
  const onComplete = () => {
    window.alert(
      "Thank you for the opportunity! 🙏 Looking forward to talking more."
    );
  };

  return (
    <div className="blue-box">
      <div className="review-pair">
        Username <span className="review-value">{username}</span>
      </div>
      <div className="review-pair">
        Email <span className="review-value">{email}</span>
      </div>
      <div className="review-pair">
        Phone <span className="review-value">{phone}</span>
      </div>
      <div className="review-pair">
        Country <span className="review-value">{country}</span>
      </div>
      <button className="button complete" onClick={onComplete}>
        Complete
      </button>
    </div>
  );
}

export default Review;
