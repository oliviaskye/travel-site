import React from 'react';

// البيانات
const RatingList = [
  {
    id: '1',
    name: 'John Doe',
    comment: "Best hotel I've ever stayed at!",
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    stars: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    comment: "Great experience, highly recommend!",
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    stars: 4,
  },
  {
    id: '3',
    name: 'Sam Wilson',
    comment: "The staff was amazing, very friendly.",
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    stars: 5,
  },
  {
    id: '3',
    name: 'Sam Wilson',
    comment: "The staff was amazing, very friendly.",
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    stars: 5,
  },
  {
    id: '3',
    name: 'Sam Wilson',
    comment: "The staff was amazing, very friendly.",
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    stars: 5,
  },


 

];

export default function Rating() {
  return (
    <div className="rating" style={styles.ratingContainer}>
      {RatingList.map((person) => (
        <div key={person.id} style={styles.ratingItem}>
          <img src={person.image} alt={person.name} style={styles.image} />
          <div style={styles.textContainer}>
            <h3 style={styles.name}>{person.name}</h3>
            <p style={styles.comment}>{person.comment}</p>
            <div style={styles.stars}>
              {"★".repeat(person.stars)}{" "}
              {"☆".repeat(5 - person.stars)} {/* Display filled and empty stars */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// الأنماط (CSS)
const styles = {
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    padding: '10px',
    height: '100%', 
    width: '100%', 
    overflowx: 'auto', 
    writingMode: 'horizontal-tb',
    justifyContent: 'space-btwen'
  },
  ratingItem: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    width: '100%', // Ensure the rating item takes full width
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  comment: {
    fontSize: '14px',
    color: '#555',
    margin: '5px 0',
  },
  stars: {
    fontSize: '14px',
    color: '#f39c12',
  },
};
