import { Layout } from "antd";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/heroSection/HeroSection";

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <HeroSection />
      <Footer />
    </Layout>
  );
};

export default Home;
