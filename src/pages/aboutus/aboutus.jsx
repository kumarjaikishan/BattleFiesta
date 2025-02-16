import React from 'react';
import './aboutus.css'
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us || BattleFiesta</title>
        <link rel="canonical" href={`${window.location.origin}/about`} />
        <meta name="description"
          content="Learn more about BattleFiesta, the ultimate platform for organizing and managing PUBG, BGMI,
     and Free Fire tournaments. Create automatic stunning points tables, discover our mission, vision, and how we bring esports to life." />
    </Helmet>

      <div className="container">
        <h2>About BattleFiesta</h2>
        <p>Welcome to BattleFiesta, the perfect platform for PUBG, BGMI, and Free Fire tournament organizers.</p>
        <p>We make it easy for organizers to create and manage tournaments. Our platform also provides automatic and beautifully designed points tables, so you can track rankings effortlessly. Whether you're hosting a small event or a big competition, BattleFiesta helps you run smooth and exciting tournaments.</p>

        <h3>Our Mission</h3>
        <p>Our mission is to empower tournament organizers with the best tools to manage and grow their esports events. We aim to simplify tournament management and provide accurate, real-time points tables, making competitive gaming more exciting and organized for players and fans alike.</p>

        <h3>What We Offers?</h3>

        <h3>⦿ Tournament Management</h3>
        <p>Your all-in-one eSports tournament platform. Customize your points system, manage registrations, teams, and matches from one easy dashboard. Battle Royale or Team Deathmatch, we've got you covered. Join us and level up your eSports tournaments today!</p>

        <h3>⦿ Get Notification</h3>
        <p> Just allow notification and you are good to go, Get Notification whenever any contestant join your Tournament</p>

        <h3>⦿ Detailed Stats</h3>
        <p> Elevate your tournaments with our dedicated stats pages! Showcase top fraggers, team performance, and stunning graphs—all publicly accessible. Share your stats page link with your audience and let the excitement unfold!</p>

        <h3>⦿ Points Table Maker</h3>
        <p>Simplify your tournaments with automatic points table generation! Just enter match results, and watch as the table builds itself. Choose from various themes to customize your display. No more complex software—just streamlined tournament management at your fingertips!</p>

        <h3>⦿ Registration forms</h3>
        <p> Effortlessly create tournament registration forms with a few clicks. Start accepting applications in no time!</p>

        <h3>⦿ Support Logos</h3>
        <p>With BattleFiesta, personalize your tournaments, teams, and players with custom logos!. Ans also Supports Payment Screenshot.</p>

        <h3>⦿ Find Tournaments</h3>
        <p>All tournaments created are showcased in the dedicated "Tournament" section of our website!</p>

        <h3>⦿ Get Involved</h3>
        <p>"Ready to revolutionize your tournament experience? Join us and discover a whole new level of excitement!"</p>
        <p>For any inquiries or partnership opportunities, feel free to contact us at contact@battlefiesta.com.</p>
      </div>
    </div>
  );
}

export default AboutUs;
